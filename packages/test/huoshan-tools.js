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
        name: 'get_current_weather',
        description: '获取指定地点的天气信息，支持摄氏度和华氏度两种单位',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: '地点的位置信息，例如北京、上海',
            },
            unit: {
              type: 'string',
              enum: ['摄氏度', '华氏度'],
              description: '温度单位，可选值为摄氏度或华氏度',
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
    { role: 'user', content: '北京今天天气怎么样？' },
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
    content: '北京今天天气是晴天',
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
