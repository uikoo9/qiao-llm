## qiao-llm

[![npm version](https://img.shields.io/npm/v/qiao-llm.svg?style=flat-square)](https://www.npmjs.org/package/qiao-llm)
[![npm downloads](https://img.shields.io/npm/dm/qiao-llm.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-llm)

llm tools

## usage

```javascript
// commonjs
const QiaoLLM = require('qiao-llm');

// es6
import QiaoLLM from 'qiao-llm';
```

## api

### QiaoLLM

初始化实例

- options
  - 类型: object
  - 说明: 初始化实例的信息
- options.apiKey
  - 类型: string
  - 说明: apiKey
- options.baseURL
  - 类型: string
  - 说明: baseURL
- return
  - 类型: object
  - 说明: QiaoLLM实例

```javascript
const LLM = QiaoLLM(options);
```

### chat

普通对话

- chatOptions
  - 类型: object
  - 说明: 对话信息
- chatOptions.model
  - 类型: string
  - 说明: 模型名称
- chatOptions.messages
  - 类型: array
  - 说明: 对话消息
- return
  - 类型: object
  - 说明: 返回的消息

```javascript
// chat options
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
return await LLM.chat(chatOptions);
```

### chatWithStreaming

流式对话

- chatOptions
  - 类型: object
  - 说明: 对话信息
- chatOptions.model
  - 类型: string
  - 说明: 模型名称
- chatOptions.messages
  - 类型: array
  - 说明: 对话消息
- callback
  - 类型: function
  - 说明: 流式返回的对话消息

```javascript
// chat options
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
await LLM.chatWithStreaming(chatOptions, (msg) => {
  console.log(msg);
});
```

### chatWithTools

调用函数工具的对话

- chatOptions
  - 类型: object
  - 说明: 对话信息
- chatOptions.model
  - 类型: string
  - 说明: 模型名称
- chatOptions.messages
  - 类型: array
  - 说明: 对话消息
- toolFunctions
  - 类型: object
  - 说明: 函数集合
- return
  - 类型: string
  - 说明: 返回的消息

```javascript
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

// go
// 返回“北京今天天气是晴天”
const res = await LLM.chatWithTools(chatOptions, toolFunctions);
```

## demo

一个完整的调用函数工具的对话例子

```javascript
// 初始化
const LLM = require('qiao-llm')({
  apiKey: require('./config.json').huoshan_key, // 调用大模型的apikey
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3', // 调用大模型的url
});

// main
(async () => {
  // 默认的消息，其中user是你的提问
  const messages = [
    { role: 'system', content: '你是人工智能助手' },
    { role: 'user', content: '北京市今天天气怎么样？' },
  ];

  // tools
  const tools = [
    {
      type: 'function',
      function: {
        name: 'get_city_weather', // 这个是要调用的函数名
        description: '获取指定位置的天气', // 这个是函数描述，需要和你的问题对应，让大模型可以通过描述找到这个函数

        // 大模型调用函数时候传入的参数
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
  // 这里顶一个函数集合，和上面tools中的function name要匹配，可以实现自己的业务逻辑
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

  // 最终返回了“北京市今天天气是晴天。”
  const res = await LLM.chatWithTools(chatOptions, toolFunctions);
  console.log(res);
})();
```
