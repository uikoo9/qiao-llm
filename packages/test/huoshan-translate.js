// llm
const llm = require('qiao-llm');

// llm
const LLM = llm({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
async function main() {
  const chatOptions = {
    model: 'ep-20250721164252-zzmtx',
    messages: [
      { role: 'system', content: '你是人工智能助手' },
      { role: 'user', content: '常见的十字花科植物有哪些？' },
    ],
    thinking: {
      type: 'disabled',
    },
  };

  // go
  const res = await LLM.chat(chatOptions);
  console.log(res);
}

main();
