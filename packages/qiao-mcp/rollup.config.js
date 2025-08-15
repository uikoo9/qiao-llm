/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: ['@modelcontextprotocol/sdk/client/index.js', '@modelcontextprotocol/sdk/client/streamableHttp.js'],
};
