import { AzureOpenAI, OpenAI } from 'openai';

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
type NetlifyEvent = { httpMethod: string; body: string | null };
type NetlifyResponse = { statusCode: number; headers?: Record<string, string>; body: string };

const systemPrompt = `You are PeopleHub's HR assistant. Help employees with leave, payroll, benefits, and company policies. Give clear, practical answers while noting when a question needs a People Partner or manager. If a question is outside HR, politely redirect the employee back to leave, payroll, benefits, or policies. Never invent confidential employee data or claim to complete actions you cannot perform.`;
const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  try {
    const { message, history } = JSON.parse(event.body ?? '{}') as { message?: unknown; history?: ChatMessage[] };
    if (typeof message !== 'string' || !message.trim()) return { statusCode: 400, headers, body: JSON.stringify({ error: 'message is required' }) };
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    if (!endpoint || !apiKey || !deployment) return { statusCode: 200, headers, body: JSON.stringify({ reply: 'Demo mode: I can help with leave, payroll, benefits, and HR policies. Try asking how to request time off or where to find a policy.' }) };
    const messages: ChatMessage[] = [{ role: 'system', content: systemPrompt }, ...(Array.isArray(history) ? history.filter((item) => item.role === 'user' || item.role === 'assistant').slice(-12) : []), { role: 'user', content: message.trim() }];
    const isFoundryProject = endpoint.includes('.services.ai.azure.com/api/projects/');
    const client = isFoundryProject
      ? new OpenAI({ apiKey, baseURL: `${endpoint.replace(/\/+$/, '')}/openai/v1/` })
      : new AzureOpenAI({ endpoint, apiKey, apiVersion: process.env.AZURE_OPENAI_API_VERSION ?? '2024-10-21' });
    const completion = await client.chat.completions.create({ model: deployment, messages });
    const reply = completion.choices[0]?.message?.content ?? 'I could not find an answer. Please contact your People Partner.';
    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };
  } catch (error) {
    console.error('Azure OpenAI request failed', error);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'The HR assistant is temporarily unavailable.' }) };
  }
}
