import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const PORT = process.env.PORT || 3001
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || ''
const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

app.post('/api/zhipu/chat', async (req, res) => {
  try {
    if (!ZHIPU_API_KEY) {
      res.status(500).send('Missing ZHIPU_API_KEY')
      return
    }
    const { messages = [], model = 'glm-4', temperature = 0.7 } = req.body || {}
    const upstream = await fetch(ZHIPU_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZHIPU_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        stream: true,
      }),
    })

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text().catch(() => '')
      res.status(502).send(text || 'Bad upstream response')
      return
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')

    upstream.body.on('data', (chunk) => {
      res.write(chunk)
    })
    upstream.body.on('end', () => res.end())
    upstream.body.on('error', () => res.end())
  } catch (e) {
    res.status(500).send('Proxy error')
  }
})

app.listen(PORT, () => {
  console.log(`Zhipu proxy listening on http://localhost:${PORT}`)
})


