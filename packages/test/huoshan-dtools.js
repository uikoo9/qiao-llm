// llm
const LLM = require('qiao-llm')({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
(async () => {
  // messages
  const messages = [
    { role: 'system', content: '你是人工智能助手' },
    { role: 'user', content: '北京市今天天气怎么样？' },
  ];

  // tools
  const tools = [
    {
      type: 'function',
      function: {
        name: 'get_city_weather',
        description: '获取指定位置的天气',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: '指定的城市位置',
            },
          },
          required: ['location'],
        },
      },
    },
  ];

  // chat options
  const chatOptions = {
    model: 'ep-20250721164252-zzmtx',
    messages: messages,
    tools: tools,
    thinking: {
      type: 'disabled',
    },
  };

  // functions
  const toolFunctions = {
    get_city_weather: (args) => {
      try {
        console.log(args);

        const obj = JSON.parse(args);
        return `${obj.location}今天天气是晴天。`;
      } catch (error) {
        console.log(error);
        return '获取天气失败！';
      }
    },
  };

  // Non-streaming:
  console.log('----- standard request -----');
  const res = await LLM.chatWithTools(chatOptions, toolFunctions);
  console.log(res);
})();
