// qiao
const { readFile } = require('qiao-file');

// llm
const LLM = require('qiao-llm')({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
(async () => {
  // messages
  const prompt = await readFile('./prompt-baiban.md');
  const messages = [
    { role: 'system', content: prompt },
    { role: 'user', content: '给我画一个简单的登录框' },
  ];

  // chat options
  const chatOptions = {
    model: 'ep-20250721164252-zzmtx',
    messages: messages,
    thinking: {
      type: 'disabled',
    },
  };

  // Non-streaming:
  console.log('----- standard request -----');
  const res = await LLM.chat(chatOptions);
  console.log(res.content);
})();
