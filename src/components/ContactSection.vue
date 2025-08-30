<script setup lang="ts">
const links = [
  { name: 'Email', value: '2572640604@qq.com', href: 'mailto:2572640604@qq.com' },
  { name: 'Phone', value: '18507534569', href: 'tel:18507534569' },
  { name: 'GitHub', value: '可添加：github.com/yourname', href: 'https://github.com/' },
]
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <h2>联系方式与社交媒体</h2>
      <div class="grid">
        <a v-for="l in links" :key="l.name" class="card" :href="l.href" target="_blank" rel="noopener">
          <div class="name">{{ l.name }}</div>
          <div class="value">{{ l.value }}</div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container { max-width: 1080px; margin: 0 auto; }
.grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
.card { display: block; background: var(--card); border: 1px solid var(--border); padding: 14px; border-radius: 12px; text-decoration: none; color: var(--fg); }
.card:hover { background: var(--tint); }
.card .icon { margin-bottom: 6px; }
.card .label { font-size: 12px; color: var(--muted); margin-bottom: 2px; }
.card .value { font-weight: 600; }
@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr; }
}
</style>


