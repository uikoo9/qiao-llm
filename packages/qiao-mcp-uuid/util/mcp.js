'use strict';

var mcp_js = require('@modelcontextprotocol/sdk/server/mcp.js');
var stdio_js = require('@modelcontextprotocol/sdk/server/stdio.js');
var streamableHttp_js = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
var zod = require('zod');
var uuid = require('uuid');

// mcp

function getServer() {
  // server
  const server = new mcp_js.McpServer({
    name: 'qiao-mcp-uuid',
    version: '0.0.1',
  });
  server.registerTool(
    'uuid',
    {
      title: 'UUID Tool',
      description: 'return a uuid string',
      inputSchema: { message: zod.z.string() },
    },
    async () => ({
      content: [{ type: 'text', text: uuid.v4() }],
    }),
  );

  // r
  return server;
}

/**
 * startHttpServer
 * @returns
 */
const startHttpServer = async (req, res) => {
  try {
    // server
    const server = getServer();

    // transport
    const transport = new streamableHttp_js.StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(transport);
    await transport.handleRequest(req.request, res.response, req.body);

    // close
    transport.close();
    server.close();
  } catch (error) {
    console.error('Error handling MCP request:', error);
    res.json({
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: 'Internal server error',
      },
      id: null,
    });
  }
};

/**
 * startStdioServer
 */
const startStdioServer = async () => {
  try {
    // server
    const server = getServer();

    // transport
    const transport = new stdio_js.StdioServerTransport();

    // go
    await server.connect(transport);
  } catch (error) {
    console.error('Error handling MCP request:', error);
  }
};

exports.startHttpServer = startHttpServer;
exports.startStdioServer = startStdioServer;
