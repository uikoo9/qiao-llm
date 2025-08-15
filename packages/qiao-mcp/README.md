## qiao-mcp

[![npm version](https://img.shields.io/npm/v/qiao-mcp.svg?style=flat-square)](https://www.npmjs.org/package/qiao-mcp)
[![npm downloads](https://img.shields.io/npm/dm/qiao-mcp.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-mcp)

mcp

## usage

```javascript
// commonjs
const { getMCPHTTPClient } = require('qiao-mcp');

// es6
import getMCPHTTPClient from 'qiao-mcp';
```

## api

### getMCPHTTPClient

获取mcp http client

- options
  - 类型: object
  - 说明: 配置项
- options.clientName
  - 类型: string
  - 说明: clientName
- options.clientVersion
  - 类型: string
  - 说明: clientVersion
- options.clientOnMessgae
  - 类型: string
  - 说明: clientOnMessgae
- options.clientOnError
  - 类型: string
  - 说明: clientOnError
- options.mcpUrl
  - 类型: string
  - 说明: mcpUrl
- options.mcpOnError
  - 类型: string
  - 说明: mcpOnError
- return
  - 类型: object
  - 说明: mcp client

```javascript
await getMCPHTTPClient(options);
```
