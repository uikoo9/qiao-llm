// openai
const OpenAI = require('openai');

// config
const config = require('./config.json');

// openai
const openai = new OpenAI({
  apiKey: config.huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
async function main() {
  // Non-streaming:
  console.log('----- standard request -----');
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: '你是人工智能助手' },
      { role: 'user', content: '常见的十字花科植物有哪些？' },
    ],
    model: 'ep-20250702143944-jdbdc',
  });
  console.log(completion.choices[0]?.message?.content);

  // Streaming:
  console.log('----- streaming request -----');
  const stream = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: '你是人工智能助手' },
      { role: 'user', content: '常见的十字花科植物有哪些？' },
    ],
    model: 'ep-20250702143944-jdbdc',
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
