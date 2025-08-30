// 测试Ollama连接的简单脚本
const testOllama = async () => {
  const baseUrl = 'http://localhost:11434'
  const model = 'qwen3:8b'
  
  try {
    console.log('测试Ollama连接...')
    
    // 测试服务状态
    const healthResponse = await fetch(`${baseUrl}/api/tags`)
    if (!healthResponse.ok) {
      throw new Error(`HTTP ${healthResponse.status}`)
    }
    
    const models = await healthResponse.json()
    console.log('✅ Ollama服务正常运行')
    console.log('可用模型:', models.models.map(m => m.name))
    
    // 测试指定模型是否存在
    const modelExists = models.models.some(m => m.name === model)
    if (modelExists) {
      console.log(`✅ 模型 ${model} 已安装`)
    } else {
      console.log(`❌ 模型 ${model} 未找到，可用模型:`, models.models.map(m => m.name))
    }
    
    // 测试聊天API
    console.log('测试聊天API...')
    const chatResponse = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: '你好，这是一个测试' }],
        stream: false,
        max_tokens: 50
      })
    })
    
    if (chatResponse.ok) {
      const result = await chatResponse.json()
      console.log('✅ 聊天API正常工作')
      console.log('响应:', result.choices[0]?.message?.content)
    } else {
      console.log('❌ 聊天API异常:', chatResponse.status)
    }
    
  } catch (error) {
    console.error('❌ 连接失败:', error.message)
    console.log('请确保:')
    console.log('1. Ollama服务已启动 (ollama serve)')
    console.log('2. 模型已下载 (ollama pull qwen3:8b)')
    console.log('3. 端口11434可访问')
  }
}

testOllama()