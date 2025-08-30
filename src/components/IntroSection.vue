<script setup lang="ts">
</script>

<template>
  <section id="intro" class="section hero">
    <div class="container">
      <div class="left">
        <h1>王洪洲</h1>
        <p class="subtitle">Java 开发工程师 · 3年经验 · 深圳</p>
        <p class="desc">
          擅长 Java 后端开发与微服务架构，精通 Spring 全家桶、MyBatis、MySQL 与 Redis，
          熟悉分布式系统与消息队列，在高并发与性能优化方面有实践经验。具备 AI 大模型集成能力，
          可独立完成从需求分析、方案设计到上线运维的全流程工作。
        </p>
        <p class="advantage">优势：擅长高并发与数据一致性场景的架构与性能优化；具备 AI 大模型业务落地经验。</p>
        <div class="meta">
          <span>电话：18507534569</span>
          <span>邮箱：2572640604@qq.com</span>
        </div>
        <div class="cta">
          <a href="#contact">联系我</a>
          <a href="/resume.pdf" download class="ghost">下载PDF简历</a>
          <a href="#experience" class="ghost">查看项目</a>
        </div>
      </div>
      <div class="right">
        <div class="avatar-frame">
          <img src="/1.jpg" alt="头像" class="avatar" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: center; }
.hero { border-bottom: 1px solid var(--border); }
h1 { font-size: 40px; margin: 0 0 8px; }
.subtitle { color: var(--muted); margin: 0 0 16px; font-size: 16px; }
.desc { margin: 0 0 12px; line-height: 1.6; }
.advantage { margin: 0 0 16px; font-weight: 600; color: var(--brand); }
.meta { display: flex; gap: 16px; font-size: 14px; color: var(--muted); margin-bottom: 20px; }
.cta { display: flex; gap: 12px; flex-wrap: wrap; }
.cta a { padding: 8px 16px; border-radius: 8px; background: var(--brand); color: #fff; text-decoration: none; font-size: 14px; }
.cta a.ghost { background: transparent; color: var(--brand); border: 1px solid var(--brand); }
.avatar-frame { width: 200px; height: 200px; border-radius: 50%; overflow: hidden; border: 4px solid var(--brand); margin: 0 auto; }
.avatar { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 720px) {
  .container { grid-template-columns: 1fr; text-align: center; }
  .avatar-frame { width: 160px; height: 160px; }
}
</style>


