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
.section {
  background: var(--bg-secondary);
}

.container {
  max-width: 1080px;
  margin: 0 auto;
}

h2 {
  margin: 0 0 32px;
  font-size: 32px;
  text-align: center;
  position: relative;
  padding-bottom: 16px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--brand);
  border-radius: 3px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  animation: fadeIn 0.8s ease-out;
}

.card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 16px;
}

.num {
  color: var(--brand);
}

.bar {
  height: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  background: linear-gradient(to right, var(--brand), var(--brand-dark));
  border-radius: 4px;
  transition: width 1s ease-out;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  h2 {
    font-size: 28px;
    margin-bottom: 24px;
  }
}
</style>


