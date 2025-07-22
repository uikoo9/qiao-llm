// mcp
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

// uuid
import { v4 as uuidv4 } from 'uuid';

function getServer() {
  // server
  const server = new McpServer({
    name: 'qiao-mcp-uuid',
    version: '0.0.1',
  });
  server.registerTool(
    'uuid',
    {
      title: 'UUID Tool',
      description: 'return a uuid string',
      inputSchema: { message: z.string() },
    },
    async () => ({
      content: [{ type: 'text', text: uuidv4() }],
    }),
  );

  // r
  return server;
}

/**
 * startHttpServer
 * @returns
 */
export const startHttpServer = async (req, res) => {
  try {
    // server
    const server = getServer();

    // transport
    const transport = new StreamableHTTPServerTransport({
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
export const startStdioServer = async () => {
  try {
    // server
    const server = getServer();

    // transport
    const transport = new StdioServerTransport();

    // go
    await server.connect(transport);
  } catch (error) {
    console.error('Error handling MCP request:', error);
  }
};
