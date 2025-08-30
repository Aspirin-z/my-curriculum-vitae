<script setup lang="ts">
type Item = { title: string; meta: string; content: string[] }
const company = {
  name: '广东众望通科技股份有限公司',
  role: 'Java 开发工程师',
  period: '2022.06 – 2025.08',
  duties: [
    '参与需求分析与方案设计，负责核心模块研发与上线',
    '主导微服务下用户中心、订单、库存、积分等模块实现',
    '通过 SQL 优化、缓存与异步处理提升系统性能',
    '集成阿里云 OSS/IOT、百度千帆、RabbitMQ 等第三方',
    '负责 AI 能力接入：基于 Python/Agent 的服务编排、提示词模板化与效果评测',
    '推进代码规范与 Review，编写技术文档与培养新人',
    '参与监控与故障排查，保障生产稳定性与高可用性'
  ]
}

const projects: Item[] = [
  {
    title: '健康家 e 签管理系统',
    meta: 'SpringBoot, MyBatis-Plus, MySQL, Redis, 阿里云IOT/OSS, WebSocket, JWT, 百度千帆',
    content: [
      '负责心率监测模块，完成 IOT 设备接入、数据上报与展示',
      '牵头签约管理模块，覆盖流程、任务分配、状态追踪与电子签约记录',
      '主导健康评估 AI 集成，设计 Prompt，规范 JSON 返回与清洗工具',
      '基于 Python(FastAPI) 实现 AI 代理层，统一鉴权/限流/重试与降级，供前端与微服务调用',
      '构建问答/RAG 雏形：将体检指标说明等文档做切片与向量化（FAISS），提升解读准确率',
      '引入 Few-shot 模板与输出结构约束（JSON Schema），并建立准确率/召回率与一致性评测集',
      '使用 Redis 缓存高频数据，降低数据库压力',
      '基于 WebSocket 实现系统通知与告警实时推送',
      '引入缓存队列与定时持久化策略，平衡实时性能与可靠性',
      '业绩：评估效率+80%，核心接口响应时间降低约40%'
    ]
  },
  {
    title: '智能仓储管理系统',
    meta: 'SpringCloud Alibaba, Nacos, MySQL, Redis, RabbitMQ, Vue3, Element Plus, Docker',
    content: [
      '负责库存中心与订单中心，完成扣减/返还/盘点与状态机',
      '用 RabbitMQ 构建异步任务，提升吞吐与响应速度',
      '基于 Redis 分布式锁与缓存，防止超卖与缓解热点',
      'Docker 化核心服务，配合 CI/CD 实现标准化部署',
      '探索 AI 应用：结合历史出入库数据生成补货建议与异常解释文案（离线评估/灰度投放）',
      '业绩：库存操作效率+30%，日均订单处理量 5万+，高并发稳定'
    ]
  },
  {
    title: '全域电商营销积分平台',
    meta: 'SpringBoot, Dubbo, MySQL, Redis, Kafka, Elasticsearch, Vue2',
    content: [
      '设计积分账户体系：创建、冻结/解冻、加扣积分、流水',
      '实现发放/消费流程，保障 RPC 场景下的事务一致性',
      '用 Kafka 异步写流水与补偿机制，确保最终一致',
      '基于 ES 构建多条件积分流水检索，500ms 内响应',
      '防刷方案：Redis 行为计数与限流',
      '引入 AI 运营辅助：基于用户行为日志生成活动宣推与客服答复模板（人工审核后投放）'
    ]
  }
]
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <h2>工作经历与项目经验</h2>
      <div class="company">
        <div class="head">
          <div class="left">
            <div class="name">{{ company.name }}</div>
            <div class="role">{{ company.role }}</div>
          </div>
          <div class="period">{{ company.period }}</div>
        </div>
        <ul class="duties">
          <li v-for="d in company.duties" :key="d">{{ d }}</li>
        </ul>
      </div>

      <div class="timeline">
        <div v-for="p in projects" :key="p.title" class="item">
          <div class="dot" />
          <div class="card">
            <div class="title">{{ p.title }}</div>
            <div class="meta">{{ p.meta }}</div>
            <ul>
              <li v-for="c in p.content" :key="c">{{ c }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container { max-width: 1080px; margin: 0 auto; }
h2 { margin: 0 0 16px; }
.company { background: var(--card); border: 1px solid var(--border); padding: 16px; border-radius: 12px; margin-bottom: 16px; }
.head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.name { font-weight: 600; font-size: 1.1em; }
.period { color: var(--muted); font-size: 0.9em; }
.duties { margin: 8px 0 0 16px; padding: 0; }
.duties li { margin-bottom: 4px; }

.timeline { position: relative; padding-left: 24px; }
.timeline::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: var(--border); }
.item { position: relative; margin-bottom: 24px; }
.dot { position: absolute; left: -24px; top: 4px; width: 12px; height: 12px; background: var(--brand); border-radius: 50%; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; }
.card .title { font-weight: 600; margin-bottom: 4px; }
.card .meta { font-size: 0.85em; color: var(--muted); margin-bottom: 8px; }
.card ul { margin: 0 0 0 16px; padding: 0; }
.card li { margin-bottom: 4px; }
</style>


