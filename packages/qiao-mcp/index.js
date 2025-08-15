'use strict';

var index_js = require('@modelcontextprotocol/sdk/client/index.js');
var streamableHttp_js = require('@modelcontextprotocol/sdk/client/streamableHttp.js');

// mcp

/**
 * getMCPHTTPClient
 * @param {*} options
 * @returns
 */
const getMCPHTTPClient = async (options) => {
  // options
  const clientName = options.clientName;
  const clientVersion = options.clientVersion || '1.0.0';
  const clientOnMessgae = options.clientOnMessgae;
  const clientOnError = options.clientOnError;
  const mcpUrl = options.mcpUrl;
  const mcpOnError = options.mcpOnError;

  // client
  const client = new index_js.Client({ name: clientName, version: clientVersion });
  client.onmessage = (msg) => {
    if (clientOnMessgae) clientOnMessgae(msg);
  };
  client.onerror = (err) => {
    if (clientOnError) clientOnError(err);
  };

  // connect
  try {
    const transport = new streamableHttp_js.StreamableHTTPClientTransport(new URL(mcpUrl));
    return await client.connect(transport);
  } catch (error) {
    if (mcpOnError) mcpOnError(error);
  }
};

exports.getMCPHTTPClient = getMCPHTTPClient;
