// mcp
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

/**
 * getMCPHTTPClient
 * @param {*} options
 * @returns
 */
export const getMCPHTTPClient = async (options) => {
  // options
  const clientName = options.clientName;
  const clientVersion = options.clientVersion || '1.0.0';
  const clientOnMessgae = options.clientOnMessgae;
  const clientOnError = options.clientOnError;
  const mcpUrl = options.mcpUrl;
  const mcpOnError = options.mcpOnError;

  // client
  const client = new Client({ name: clientName, version: clientVersion });
  client.onmessage = (msg) => {
    if (clientOnMessgae) clientOnMessgae(msg);
  };
  client.onerror = (err) => {
    if (clientOnError) clientOnError(err);
  };

  // connect
  try {
    const transport = new StreamableHTTPClientTransport(new URL(mcpUrl));
    return await client.connect(transport);
  } catch (error) {
    if (mcpOnError) mcpOnError(error);
  }
};
