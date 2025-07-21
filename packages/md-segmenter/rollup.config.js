// commonjs
const { rollupPluginCommonjs } = require('qiao-project');

// node
const { rollupPluginNodeResolve } = require('qiao-project');

/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [rollupPluginCommonjs(), rollupPluginNodeResolve()],
};
