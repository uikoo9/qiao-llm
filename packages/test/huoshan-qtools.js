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
    { role: 'user', content: '给我推荐一个smallwod app中北京市的用户？' },
  ];

  // tools
  const tools = [
    {
      type: 'function',
      function: {
        name: 'get_smallwod_users',
        description: '获取smallwod app中指定地点的人员推荐',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'smallwod app中的地点信息，例如北京市',
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
    get_smallwod_users: (args) => {
      console.log(args);
      return 'smallwod app中的北京市的用户推荐为wanghan';
    },
  };

  // Non-streaming:
  console.log('----- standard request -----');
  const res = await LLM.chatWithTools(chatOptions, toolFunctions);
  console.log(res);
})();
