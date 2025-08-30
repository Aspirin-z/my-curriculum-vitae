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
      <button class="theme" @click="toggleEpTheme">{{ useDark ? '浅色(EP)' : '深色(EP)' }}</button>
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
}
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 12px 16px;
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
}
.title {
  font-size: 12px;
  color: var(--muted);
}
ul { display: flex; gap: 8px; list-style: none; padding: 0; margin: 0; }
button {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
}
button:hover { border-color: var(--brand); background: rgba(42,129,251,0.08); }
@media (max-width: 720px) {
  ul { flex-wrap: wrap; }
}
</style>


