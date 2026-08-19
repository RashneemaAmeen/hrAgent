import path from 'node:path';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { getChatReply } from './chat.js';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH ?? path.resolve(process.cwd(), '../.env') });

type ChatMessage = { role: 'user' | 'assistant'; content: string };
const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ ok: true }));
app.post('/api/chat', async (request, response) => {
  const { message, history } = request.body as { message?: unknown; history?: ChatMessage[] };
  if (typeof message !== 'string' || !message.trim()) {
    response.status(400).json({ error: 'message is required' });
    return;
  }
  try {
    response.json({ reply: await getChatReply(message.trim(), Array.isArray(history) ? history : []) });
  } catch (error) {
    console.error('Azure OpenAI request failed', error);
    response.status(502).json({ error: 'The HR assistant is temporarily unavailable.' });
  }
});

app.listen(port, () => console.log(`PeopleHub HR API listening on http://localhost:${port}`));
