## qiao-agent

[![npm version](https://img.shields.io/npm/v/qiao-agent.svg?style=flat-square)](https://www.npmjs.org/package/qiao-agent)
[![npm downloads](https://img.shields.io/npm/dm/qiao-agent.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-agent)

llm agents

## usage

```javascript
// commonjs
const { translateToZH } = require('qiao-agent');

// es6
import { translateToZH } from 'qiao-agent';
```

## api

### translateToZH

将内容翻译为中文

- config
  - 类型: object
  - 说明: 大模型相关参数
- config.apiKey
  - 类型: string
  - 说明: apiKey
- config.baseURL
  - 类型: string
  - 说明: baseURL
- config.modelId
  - 类型: string
  - 说明: modelId
- content
  - 类型: string
  - 说明: 待翻译内容
- return
  - 类型: string
  - 说明: 翻译后内容

```javascript
await translateToZH(config, content);
```

### translateToEN

将内容范围为英文

- config
  - 类型: object
  - 说明: 大模型相关参数
- config.apiKey
  - 类型: string
  - 说明: apiKey
- config.baseURL
  - 类型: string
  - 说明: baseURL
- config.modelId
  - 类型: string
  - 说明: modelId
- content
  - 类型: string
  - 说明: 待翻译内容
- return
  - 类型: string
  - 说明: 翻译后内容

```javascript
await translateToEN(config, content);
```

### genChart

生成图表

- llmConfig
  - 类型: object
  - 说明: 大模型相关参数
- llmConfig.apiKey
  - 类型: string
  - 说明: apiKey
- llmConfig.baseURL
  - 类型: string
  - 说明: baseURL
- llmConfig.modelId
  - 类型: string
  - 说明: modelId
- llmConfig.modelThinking
  - 类型: string
  - 说明: modelThinking
- userPrompt
  - 类型: string
  - 说明: 用户提示词
- mcpUrl
  - 类型: string
  - 说明: mcp url
- return
  - 类型: object
  - 说明: 生成图表的信息

```javascript
await genChart(llmConfig, userPrompt, mcpUrl);
```
