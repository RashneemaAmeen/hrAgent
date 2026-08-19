import { AzureOpenAI, OpenAI } from 'openai';

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

const systemPrompt = `You are PeopleHub's HR assistant. Help employees with leave, payroll, benefits, and company policies. Give clear, practical answers while noting when a question needs a People Partner or manager. If a question is outside HR, politely redirect the employee back to leave, payroll, benefits, or policies. Never invent confidential employee data or claim to complete actions you cannot perform.`;

export async function getChatReply(message: string, history: ChatMessage[] = []) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (!endpoint || !apiKey || !deployment) {
    return "Demo mode: I can help with leave, payroll, benefits, and HR policies. Try asking how to request time off or where to find a policy.";
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.filter((item) => item.role === 'user' || item.role === 'assistant').slice(-12),
    { role: 'user', content: message },
  ];
  const isFoundryProject = endpoint.includes('.services.ai.azure.com/api/projects/');
  const client = isFoundryProject
    ? new OpenAI({ apiKey, baseURL: `${endpoint.replace(/\/+$/, '')}/openai/v1/` })
    : new AzureOpenAI({ endpoint, apiKey, apiVersion: process.env.AZURE_OPENAI_API_VERSION ?? '2024-10-21' });
  const completion = await client.chat.completions.create({ model: deployment, messages });
  return completion.choices[0]?.message?.content ?? 'I could not find an answer. Please contact your People Partner.';
}
