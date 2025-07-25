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
(async () => {
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

  // messages
  const messages = [
    { role: 'system', content: '你是人工智能助手' },
    { role: 'user', content: '给我推荐一个smallwod app中北京市的用户？' },
  ];

  // Non-streaming:
  console.log('----- standard request -----');
  const completion = await openai.chat.completions.create({
    model: 'ep-20250721164252-zzmtx',
    tools: tools,
    messages: messages,
    thinking: {
      type: 'disabled',
    },
  });
  console.log(completion.choices[0]);

  // tools
  const tool_call = completion.choices[0].message.tool_calls[0];
  console.log(tool_call);
  messages.push(completion.choices[0].message);
  messages.push({
    role: 'tool',
    tool_call_id: tool_call.id,
    content: '给你推荐smallwod app中北京市的用户是wanghan',
  });

  // go
  const completionWithTool = await openai.chat.completions.create({
    model: 'ep-20250721164252-zzmtx',
    tools: tools,
    messages: messages,
    thinking: {
      type: 'disabled',
    },
  });
  console.log(completionWithTool.choices[0]);
})();
