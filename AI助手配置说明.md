# AI助手配置说明

## 方案B：本地Ollama部署

### 已完成的配置

✅ **环境变量配置** - 已创建 `.env.local` 文件：
```bash
# Ollama 本地部署配置
VITE_USE_OLLAMA=true
VITE_OLLAMA_BASE=http://localhost:11434
VITE_OLLAMA_MODEL=qwen3:8b
```

✅ **代码优化** - 已更新 `AiChatWidget.vue`：
- 支持qwen3:8b模型
- 改进SSE流式解析
- 增强错误处理和超时控制
- 显示当前使用的AI服务

### 使用步骤

1. **确认Ollama服务运行**
   ```bash
   # 检查Ollama状态
   ollama --version
   
   # 确认qwen3:8b模型已下载
   ollama list
   
   # 如果未下载，执行：
   ollama pull qwen3:8b
   ```

2. **启动Ollama服务**
   ```bash
   # 启动Ollama（Windows）
   ollama serve
   
   # 或后台运行
   start ollama serve
   ```

3. **验证API端点**
   ```bash
   # 测试API连通性
   curl http://localhost:11434/api/tags
   ```

4. **启动前端项目**
   ```bash
   npm run dev
   ```

### 故障排除

#### 常见问题

1. **连接失败**
   - 确认Ollama服务已启动：检查任务管理器中的`ollama.exe`
   - 检查端口占用：`netstat -ano | findstr 11434`
   - 防火墙设置：允许Ollama通过Windows防火墙

2. **模型未找到**
   ```bash
   # 查看已安装模型
   ollama list
   
   # 下载qwen3:8b
   ollama pull qwen3:8b
   ```

3. **内存不足**
   - qwen3:8b需要约8GB内存
   - 考虑使用较小模型：`qwen3:4b` 或 `qwen3:1.8b`

#### 切换模型

修改 `.env.local` 文件：
```bash
# 切换到其他模型
VITE_OLLAMA_MODEL=qwen3:4b      # 更小更快
VITE_OLLAMA_MODEL=llama3:8b     # Llama 3
VITE_OLLAMA_MODEL=gemma:7b      # Google Gemma
```

#### 切换回智谱

```bash
# 禁用本地Ollama，启用智谱
VITE_USE_OLLAMA=false
VITE_ZHIPU_API_KEY=your_actual_key_here
```

### 性能优化建议

1. **GPU加速**（如果支持）
   - 确保已安装NVIDIA驱动和CUDA
   - 设置环境变量：`OLLAMA_GPU=1`

2. **并发限制**
   - 避免同时发起多个请求
   - 等待当前对话完成再发送新消息

3. **内存管理**
   - 关闭不必要的应用程序
   - 考虑增加虚拟内存

### 思考过滤功能
AI助手会自动过滤掉以下内容：
- `<think>...</think>` 标签及其内容
- `<思考>...</思考>` 等中文思考标签
- 推理过程和分析步骤
- 只向用户展示最终整理后的回答

### 监控和日志

- **前端日志**：浏览器开发者工具 → Console
- **Ollama日志**：查看Ollama服务输出
- **网络请求**：浏览器开发者工具 → Network → 检查/v1/chat/completions

### 模型性能对比

| 模型 | 大小 | 速度 | 内存需求 | 适用场景 |
|------|------|------|----------|----------|
| qwen3:1.8b | ~2GB | 快 | 2-3GB | 简单对话 |
| qwen3:4b | ~4GB | 中等 | 4-5GB | 一般问答 |
| qwen3:8b | ~8GB | 较慢 | 8-10GB | 复杂任务 |

### 安全提醒

- 本地部署不会暴露API密钥
- 确保Ollama服务仅在本地监听（127.0.0.1）
- 定期检查Ollama版本更新