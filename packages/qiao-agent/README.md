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
