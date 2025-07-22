/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'util/mcp.js',
    format: 'cjs',
  },
  external: [
    'uuid',
    'zod',
    '@modelcontextprotocol/sdk/server/mcp.js',
    '@modelcontextprotocol/sdk/server/stdio.js',
    '@modelcontextprotocol/sdk/server/streamableHttp.js',
  ],
};
