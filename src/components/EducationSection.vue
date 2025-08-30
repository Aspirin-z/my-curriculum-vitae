<script setup lang="ts">
const education = {
  school: '深圳职业技术大学',
  major: '计算机应用技术',
  degree: '大专',
}
const certs = [
  '阿里云 ACA/ACP（云计算或云原生方向）',
  '华为云 HCIA（云服务/容器/微服务方向）',
  'MySQL 相关认证（性能优化/DBA 基础）',
  'Redis 开发与运维认证（集群与高可用）',
  'Kafka 运维与流处理实践认证',
  'Docker/Kubernetes 基础与进阶认证',
  '网络与操作系统（Linux 基础/安全加固）',
  'Java 进阶认证（如 OCPJP）',
  '技术博客/开源项目链接（可验证输出）',
]
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <h2>教育背景与证书</h2>
      <div class="card">
        <div class="row">
          <div>
            <div class="label">院校</div>
            <div class="value">{{ education.school }}</div>
          </div>
          <div>
            <div class="label">专业</div>
            <div class="value">{{ education.major }}</div>
          </div>
          <div>
            <div class="label">学历</div>
            <div class="value">{{ education.degree }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="label">证书与资质</div>
        <ul>
          <li v-for="c in certs" :key="c">{{ c }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container { max-width: 1080px; margin: 0 auto; }
.card { background: var(--card); border: 1px solid var(--border); padding: 16px; border-radius: 12px; margin-bottom: 16px; }
.row { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.label { color: var(--muted); font-size: 12px; }
.value { font-weight: 600; margin-top: 6px; }
ul { padding-left: 18px; }
@media (max-width: 720px) {
  .row { grid-template-columns: 1fr; }
}
</style>


