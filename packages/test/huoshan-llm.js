// llm
const llm = require('qiao-llm');

// llm
const LLM = llm({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
async function main() {
  const messages = [
    { role: 'system', content: '你是人工智能助手' },
    { role: 'user', content: '常见的十字花科植物有哪些？' },
  ];
  const model = 'ep-20250702143944-jdbdc';

  // // Non-streaming:
  // console.log('----- standard request -----');
  // const res = await LLM.chat(messages, model);
  // console.log(res);

  // Streaming:
  console.log('----- streaming request -----');
  await LLM.chatWithStreaming(messages, model, (msg) => {
    console.log(msg);
  });
}

main();
