#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./qllm-add.js');
require('./qllm-version.js');

// parse
cli.cmd.parse(process.argv);
