<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'

type Message = { role: 'user' | 'assistant' | 'system'; content: string }
const isOpen = ref(false)
const loading = ref(false)
const messages = ref<Message[]>([
  { role: 'assistant', content: '你好，我是 AI 助手。可以问我关于王洪洲的职业技能与经历～' }
])
const input = ref('')

// 获取环境变量
const aiServiceInfo = computed(() => {
  const useOllama = (import.meta.env.VITE_USE_OLLAMA || '').toString() === 'true'
  if (useOllama) {
    return `🏠 本地 qwen3:8b`
  } else {
    return `☁️ 智谱 ${import.meta.env.VITE_ZHIPU_MODEL || 'glm-4'}`
  }
})

// 过滤思考内容的函数
function filterThinkContent(content: string): string {
  // 移除各种格式的思考标签及其内容
  let filtered = content
    .replace(/<think>.*?<\/think>/gs, '') // 标准格式
    .replace(/<思考>.*?<\/思考>/gs, '')   // 中文格式
    .replace(/<推理>.*?<\/推理>/gs, '')   // 推理格式
    .replace(/<分析>.*?<\/分析>/gs, '')   // 分析格式
    .replace(/<推理过程>.*?<\/推理过程>/gs, '') // 详细推理
    .replace(/^.*?<\/think>/s, '') // 移除从开始到第一个</think>的内容
    .trim()
  
  // 如果过滤后内容为空或只有空白，返回空字符串
  return filtered || ''
}

// 检查内容是否包含思考标签
function hasThinkTags(content: string): boolean {
  const thinkPatterns = [
    /<think>/,
    /<\/think>/,
    /<思考>/,
    /<\/思考>/,
    /<推理>/,
    /<\/推理>/,
    /<分析>/,
    /<\/分析>/,
    /<推理过程>/,
    /<\/推理过程>/
  ]
  return thinkPatterns.some(pattern => pattern.test(content))
}

async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return
  messages.value.push({ role: 'user', content: text })
  scrollToBottom()
  input.value = ''
  loading.value = true

  try {
    const useOllama = (import.meta.env.VITE_USE_OLLAMA || '').toString() === 'true'
    if (useOllama) {
      await streamWithOllama(messages.value)
    } else {
      await streamWithZhipuDirect(messages.value)
    }
  } catch (e: unknown) {
    let errorMessage = '抱歉，服务暂时不可用。'
    
    if (e instanceof Error) {
      if (e.message.includes('Ollama')) {
        errorMessage = '本地AI服务连接失败，请确认Ollama已启动且模型已加载。'
      } else if (e.message.includes('智谱')) {
        errorMessage = '智谱AI服务连接失败，请检查API密钥和网络连接。'
      } else if (e.message.includes('timeout')) {
        errorMessage = '请求超时，请检查网络连接或稍后重试。'
      }
    }
    
    messages.value.push({ role: 'assistant', content: errorMessage })
  } finally {
    loading.value = false
  }
}

// 统一的流式处理函数
async function streamResponse(
  url: string,
  headers: Record<string, string>,
  body: object,
  errorMessageMap: Record<string, string>
) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)
  
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!resp.ok) {
      const errorText = await resp.text()
      throw new Error(`${resp.status} - ${errorText}`)
    }
    
    if (!resp.body) throw new Error('无响应数据')
    
    const idx = messages.value.push({ role: 'assistant', content: '' }) - 1
    const reader = resp.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    let fullContent = ''
    let isThinking = true
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      
      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine) continue
        
        if (trimmedLine === 'data: [DONE]') {
          if (fullContent.trim()) {
            messages.value[idx].content = filterThinkContent(fullContent)
            scrollToBottom()
          }
          return
        }
        
        if (trimmedLine.startsWith('data: ')) {
          try {
            const jsonData = JSON.parse(trimmedLine.slice(6))
            const token = jsonData.choices?.[0]?.delta?.content || ''
            if (token) {
              fullContent += token
              
              if (isThinking && !hasThinkTags(fullContent)) {
                isThinking = false
              }
              
              if (!isThinking) {
                messages.value[idx].content = filterThinkContent(fullContent)
                scrollToBottom()
              }
            }
          } catch {
            // 静默处理解析错误，避免控制台噪音
          }
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(errorMessageMap.timeout || '请求超时')
    }
    throw error
  }
}

// 方案 A：前端直连智谱
async function streamWithZhipuDirect(history: Message[]) {
  const apiKey = import.meta.env.VITE_ZHIPU_API_KEY
  if (!apiKey) {
    throw new Error('未配置智谱API密钥，请设置 VITE_ZHIPU_API_KEY')
  }
  
  const model = import.meta.env.VITE_ZHIPU_MODEL || 'glm-4'
  const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  
  return streamResponse(
    url,
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'text/event-stream'
    },
    {
      model,
      messages: history,
      stream: true,
      temperature: 0.7,
      max_tokens: 2048
    },
    {
      timeout: '智谱AI服务连接超时，请检查网络连接'
    }
  )
}

// 方案 B：直连本地 Ollama
async function streamWithOllama(history: Message[]) {
  const base = (import.meta.env.VITE_OLLAMA_BASE || 'http://localhost:11434').replace(/\/$/, '')
  const model = import.meta.env.VITE_OLLAMA_MODEL || 'qwen3:8b'
  const url = base + '/v1/chat/completions'
  
  return streamResponse(
    url,
    {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream'
    },
    {
      model,
      messages: history,
      stream: true,
      temperature: 0.7,
      max_tokens: 2048
    },
    {
      timeout: 'Ollama服务连接超时，请确认服务已启动'
    }
  )
}

const bodyRef = ref<HTMLDivElement>()

const scrollToBottom = () => {
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    }
  })
}

onMounted(() => {
  const openedOnce = localStorage.getItem('aiWidgetOpenedOnce')
  if (!openedOnce) {
    isOpen.value = true
    localStorage.setItem('aiWidgetOpenedOnce', '1')
  }
})
</script>

<template>
  <div class="chat-root" :class="{ open: isOpen }">
    <button class="fab" @click="isOpen = !isOpen" aria-label="AI 助手">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/></svg>
      <span v-if="!isOpen">AI 助手</span>
      <span v-else>× 关闭</span>
    </button>
    <div class="panel">
      <div class="header">
  AI 职业助理
  <span style="font-size: 0.8em; opacity: 0.7; margin-left: 8px;">
    {{ aiServiceInfo }}
  </span>
</div>
      <div class="body" ref="bodyRef">
        <div v-for="(m, idx) in messages" :key="`msg-${idx}-${m.role}`" class="msg" :data-role="m.role">
          <div class="bubble">{{ m.content }}</div>
        </div>
        <div v-if="loading" class="msg" data-role="assistant"><div class="bubble">正在思考中，请稍候...</div></div>
      </div>
      <div class="input">
        <input v-model="input" placeholder="询问技能、项目或联系方式..." @keyup.enter="send" />
        <button @click="send" :disabled="loading">发送</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-root { position: fixed; right: 16px; bottom: 16px; z-index: 60; }
.fab { border-radius: 999px; border: 1px solid var(--brand); background: var(--card); color: var(--fg); cursor: pointer; box-shadow: 0 10px 24px rgba(0,0,0,0.15); padding: 10px 14px; font-weight: 600; letter-spacing: .5px; display: inline-flex; align-items: center; gap: 6px; }
.fab { outline: none; }
.chat-root:not(.open) .fab { animation: pulse 2.2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(42,109,251,.35); } 50% { box-shadow: 0 0 0 10px rgba(42,109,251,0); } }
.panel { display: none; width: 320px; height: 420px; background: var(--bg); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: 0 12px 28px rgba(0,0,0,0.25); backdrop-filter: blur(10px); }
.open .panel { display: flex; flex-direction: column; }
.open .fab { transform: rotate(0); }
.header { padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--fg); font-weight: 600; background: color-mix(in oklab, var(--card) 95%, var(--brand) 5%); backdrop-filter: blur(10px); }
.body { flex: 1; padding: 12px; overflow: auto; display: flex; flex-direction: column; gap: 8px; }
.msg { display: flex; }
.msg[data-role="user"] { justify-content: flex-end; }
.bubble { 
  max-width: 80%; 
  padding: 10px 14px; 
  border-radius: 16px; 
  background: color-mix(in oklab, var(--card) 90%, var(--fg) 10%); 
  border: 1px solid var(--border); 
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.msg[data-role="user"] .bubble { 
  background: var(--brand); 
  border-color: var(--brand); 
  box-shadow: 0 2px 8px rgba(42,109,251,0.3);
}
.input { display: flex; gap: 8px; padding: 10px; border-top: 1px solid #162032; }
input { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--fg); padding: 8px 10px; border-radius: 10px; }
button { padding: 8px 12px; border-radius: 10px; border: 1px solid var(--brand); background: var(--brand);  cursor: pointer; font-weight: 600; }
button:disabled { opacity: .6; cursor: not-allowed; }
@media (max-width: 420px) { .panel { width: 92vw; height: 60vh; } }
</style>


