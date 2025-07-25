// qiao
const cli = require('qiao-cli');

// cmd for common
cli.cmd
  .version(require('../package.json').version, '-v, --version')
  .description('qiao-llm-cli, llm cli tool')
  .usage('<command> [options]');
