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

## demo

### chatOptions

```javascript
const chatOptions = {
  model: 'ep-20250721164252-zzmtx',
  messages: [
    { role: 'system', content: '你是人工智能助手' },
    { role: 'user', content: '常见的十字花科植物有哪些？' },
  ],
  thinking: {
    // 不使用深度思考能力
    type: 'disabled',
    // 使用深度思考能力
    type: 'enabled',
    // 模型自行判断是否使用深度思考能力
    type: 'auto',
  },
};
```

### tools

```javascript
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
