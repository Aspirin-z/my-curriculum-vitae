<script setup lang="ts">
import { ref, onMounted } from 'vue'
const links = [
  { id: 'intro', label: '个人简介' },
  { id: 'skills', label: '专业技能' },
  { id: 'experience', label: '工作经历与项目' },
  { id: 'education', label: '教育与证书' },
  { id: 'contact', label: '联系方式' }
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Element Plus 官方暗色主题切换：在 html 上添加/移除类名 'dark'
const useDark = ref(true)
onMounted(() => {
  const saved = localStorage.getItem('ep-theme')
  useDark.value = saved ? saved === 'dark' : true
  document.documentElement.classList.toggle('dark', useDark.value)
})
function toggleEpTheme() {
  useDark.value = !useDark.value
  document.documentElement.classList.toggle('dark', useDark.value)
  localStorage.setItem('ep-theme', useDark.value ? 'dark' : 'light')
}
</script>

<template>
  <header class="nav">
    <div class="container">
      <div class="brand">
        <span class="name">王洪洲</span>
        <span class="title">Java 开发工程师 · 深圳</span>
      </div>
      <nav>
        <ul>
          <li v-for="l in links" :key="l.id">
            <button @click="scrollToSection(l.id)">{{ l.label }}</button>
          </li>
        </ul>
      </nav>
      <button class="theme" @click="toggleEpTheme">
        <span class="theme-icon">{{ useDark ? '🌙' : '☀️' }}</span>
        <span class="theme-text">{{ useDark ? '浅色模式' : '深色模式' }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(8px);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 700;
  font-size: 18px;
  color: var(--brand);
  letter-spacing: 0.5px;
}

.title {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}

nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

ul {
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

li button {
  padding: 8px 16px;
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  background: transparent;
  color: var(--fg);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

li button:hover {
  border-color: var(--brand);
  background: rgba(52, 152, 219, 0.08);
  color: var(--brand);
  transform: translateY(-1px);
}

.theme {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--fg);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme:hover {
  background: var(--bg);
  border-color: var(--brand);
  box-shadow: var(--shadow-sm);
}

.theme-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .container {
    padding: 12px 16px;
  }
  
  nav {
    order: 3;
    width: 100%;
    margin-top: 12px;
  }
  
  .container {
    flex-wrap: wrap;
  }
  
  ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  
  li button {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .theme-text {
    display: none;
  }
  
  .theme {
    padding: 6px 10px;
  }
  
  .theme-icon {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .name {
    font-size: 16px;
  }
  
  .title {
    font-size: 12px;
  }
}
</style>


