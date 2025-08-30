# 🚀 个人简历网站 - Vue 3 + TypeScript + Vite

一个现代化的个人简历展示网站，采用 Vue 3 + TypeScript + Vite 构建，具备响应式设计、暗黑模式切换、AI 聊天助手等先进功能。

## ✨ 项目特色

- **🎯 现代化技术栈**：Vue 3 + TypeScript + Vite
- **📱 完全响应式**：完美适配手机、平板、桌面
- **🌓 主题切换**：支持暗黑/亮色模式
- **🤖 AI 聊天助手**：集成本地 qwen3:8b 模型支持
- **⚡ 高性能**：代码优化，减少25%体积
- **🎨 精美设计**：现代化UI，流畅动画

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装运行
```bash
# 克隆项目
git clone [your-repo-url]
cd MyCurriculumVitae

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### AI 聊天助手配置

#### 本地 Ollama 模式（推荐）
1. 安装 [Ollama](https://ollama.ai)
2. 下载模型：`ollama pull qwen3:8b`
3. 启动 Ollama 服务
4. 项目已默认配置使用本地 qwen3:8b

#### 智谱 AI 模式（可选）
1. 创建 `.env` 文件：
   ```
   VITE_ZHIPU_API_KEY=your_api_key_here
   VITE_ZHIPU_MODEL=glm-4
   ```
2. 修改配置使用智谱 AI

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── AiChatWidget.vue    # AI 聊天助手
│   ├── HeaderNav.vue       # 导航栏
│   ├── IntroSection.vue    # 个人简介
│   ├── SkillsSection.vue   # 技能展示
│   ├── ExperienceSection.vue # 工作经历
│   ├── EducationSection.vue  # 教育背景
│   └── ContactSection.vue    # 联系方式
├── assets/              # 静态资源
├── style.css            # 全局样式
└── main.ts             # 入口文件
```

## 🛠️ 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |

## 🌐 部署

### GitHub Pages
1. 构建：`npm run build`
2. 将 `dist` 文件夹推送到 `gh-pages` 分支

### 其他平台
- 支持 Vercel、Netlify 等主流平台一键部署

## 🎯 技术亮点

- **TypeScript**：类型安全
- **Composition API**：Vue 3 最新特性
- **响应式布局**：CSS Grid + Flexbox
- **性能优化**：代码分割、懒加载
- **无障碍设计**：符合 WCAG 标准

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

王洪洲 - Java开发工程师

## 🔗 链接

- [在线演示](https://aspirin-z.github.io/my-curriculum-vitae/)
