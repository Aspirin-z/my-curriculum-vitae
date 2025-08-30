<script setup lang="ts">
type Skill = { name: string; level: number; desc?: string }
const skills: Skill[] = [
  { name: 'Java / JVM / 并发', level: 90 },
  { name: 'Spring / SpringBoot / SpringCloud', level: 90 },
  { name: 'MyBatis / MyBatis-Plus', level: 85 },
  { name: 'MySQL（索引/优化/事务/锁）', level: 85 },
  { name: 'Redis（缓存/分布式锁/集群）', level: 85 },
  { name: '消息队列（RabbitMQ / Kafka）', level: 80 },
  { name: '分布式（Dubbo / Nacos / ZK）', level: 80 },
  { name: 'DevOps（Git / Maven / Jenkins / Docker / Linux）', level: 80 },
  { name: 'AI 集成（Python / Agent/ 提示词工程 /本地部署大模型）', level: 80 },
  { name: '前端（HTML/CSS/JS/Vue3）', level: 70 }
]
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <h2>专业技能</h2>
      <div class="grid">
        <div class="card" v-for="s in skills" :key="s.name">
          <div class="head">
            <span>{{ s.name }}</span>
            <span class="num">{{ s.level }}%</span>
          </div>
          <div class="bar"><span :style="{ width: s.level + '%' }" /></div>
        </div>
      </div>
    </div>
  </section>
  
</template>

<style scoped>
.container { max-width: 1080px; margin: 0 auto; }
h2 { margin: 0 0 16px; }
.grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
.skill { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px; }
.skill .name { font-weight: 600; margin-bottom: 4px; }
.skill .level { color: var(--muted); font-size: 12px; }
.skill .tags { margin-top: 6px; }
.tag { display: inline-block; background: var(--tint); color: var(--brand); padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-right: 4px; }
@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr; }
}
</style>


