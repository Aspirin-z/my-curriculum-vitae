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
.hero {
  min-height: 85vh;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, var(--bg), var(--bg-secondary));
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;
}

.left {
  animation: fadeIn 0.8s ease-out;
}

h1 {
  font-size: 48px;
  margin: 0 0 8px;
  background: linear-gradient(to right, var(--brand), var(--brand-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.subtitle {
  color: var(--muted);
  margin: 0 0 20px;
  font-size: 18px;
  letter-spacing: 0.5px;
}

.desc {
  margin: 0 0 16px;
  line-height: 1.7;
  font-size: 16px;
  color: var(--fg);
}

.advantage {
  margin: 0 0 24px;
  font-weight: 600;
  color: var(--accent);
  padding: 8px 16px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: var(--border-radius);
  display: inline-block;
}

.meta {
  display: flex;
  gap: 20px;
  font-size: 15px;
  color: var(--muted);
  margin-bottom: 28px;
}

.cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.cta a {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.cta a:hover {
  background: var(--brand-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.cta a.ghost {
  background: transparent;
  color: var(--brand);
  border: 1px solid var(--brand);
}

.cta a.ghost:hover {
  background: rgba(52, 152, 219, 0.1);
}

.right {
  animation: slideInRight 0.8s ease-out;
}

.avatar-frame {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--brand);
  margin: 0 auto;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar-frame:hover {
  transform: scale(1.02) rotate(2deg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 720px) {
  .hero {
    min-height: auto;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  
  .container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 32px;
  }
  
  .avatar-frame {
    width: 180px;
    height: 180px;
  }
  
  .cta {
    justify-content: center;
  }
  
  .meta {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  
  h1 {
    font-size: 36px;
  }
}
</style>


