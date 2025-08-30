## 王洪洲 · 个人简历网站（Vue 3 + Vite）

本项目为王洪洲（Java 开发工程师，现居深圳）的在线简历网站，采用 Vue 3 + TypeScript + Vite 搭建，包含响应式布局、时间线、技能可视化与右下角可折叠的 AI 聊天助手（预留智谱 API 接入）。

### 本地运行

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发：
   ```bash
   npm run dev
   ```

### 目录结构
- `src/components`：站点各区块组件（导航、简介、技能、经历、教育、联系、AI 聊天）
- `src/App.vue`：页面组装与布局
- `src/style.css`：全局样式与动画

### AI 聊天助手接入智谱说明
- 当前为演示态并带有模拟回复逻辑。
- 如需接入智谱，请：
  1. 在根目录创建 `.env` 文件，填入 `VITE_ZHIPU_API_KEY=your_key`。
  2. 强烈建议：在后端做 API 代理（隐藏密钥），前端仅调用您的后端路由。
  3. 在 `src/components/AiChatWidget.vue` 中替换 `mockZhipuReply` 与 `fetch` 调用为真实接口。

示例 `.env.example` 已提供。

### 部署
- 构建：`npm run build`
- 预览：`npm run preview`

### 版权
简历内容归王洪洲本人所有，未经允许请勿转载。
