// llm
const llm = require('qiao-llm');

// llm
const LLM = llm({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
(async () => {
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

  // Non-streaming:
  // console.log('----- standard request -----');
  // const res = await LLM.chat(chatOptions);
  // console.log(res.content);

  // callback options
  const callbackOptions = {
    firstThinkingCallback: () => {
      console.log('begin thinking');
    },
    thinkingCallback: (msg) => {
      console.log(msg);
    },
    firstContentCallback: () => {
      console.log('begin content');
    },
    contentCallback: (msg) => {
      console.log(msg);
    },
    endCallback: () => {
      console.log('end chat');
    },
  };

  // Streaming:
  console.log('----- streaming request -----');
  await LLM.chatWithStreaming(chatOptions, callbackOptions);
})();
