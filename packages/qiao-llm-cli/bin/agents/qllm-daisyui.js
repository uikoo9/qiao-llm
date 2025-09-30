// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const { readFile } = require('qiao-file');

// db
const { getDB } = require('../util.js');
const db = getDB();

// llm
const LLM = require('../../index.js');

/**
 * daisyui
 */
const daisyui = async () => {
  // check
  const modelName = await db.config('default');
  if (!modelName) {
    console.log(cli.colors.red('请先设置默认模型。'));
    return;
  }
  const model = await db.config(modelName);
  if (!model) {
    console.log(cli.colors.red(`这个模型不存在：${modelName}`));
    return;
  }

  // llms.txt
  const txtPath = path.resolve(__dirname, './daisyui-llms.txt');
  const txtContent = await readFile(txtPath);

  // init
  const llm = LLM({
    apiKey: model.apiKey,
    baseURL: model.baseURL,
  });

  // ask
  const questions = [
    {
      type: 'editor',
      name: 'content',
      message: '请输入你的问题：',
    },
  ];
  const answers = await cli.ask(questions);

  // chat
  const chatOptions = {
    model: model.modelID,
    messages: [
      {
        role: 'system',
        content: `你是一位Web前端开发专家，熟悉tailwindcss，以及daisyui，一下是daisyui的摘要\n${txtContent}`,
      },
      { role: 'user', content: answers.content },
    ],
    thinking: {
      type: model.modelThinking,
    },
  };

  // callback options
  const callbackOptions = {
    firstThinkingCallback: () => {
      console.log();
      console.log(cli.colors.gray('===begin thinking==='));
      console.log();
    },
    thinkingCallback: (msg) => {
      process.stdout.write(cli.colors.gray(msg));
    },
    firstContentCallback: () => {
      console.log();
      console.log('===begin content===');
      console.log();
    },
    contentCallback: (msg) => {
      process.stdout.write(msg);
    },
    endCallback: () => {
      console.log();
      console.log('end chat');
    },
    errorCallback: (error) => {
      console.log();
      console.log(cli.colors.red('something error'));
      console.log(error);
    },
  };

  // go
  await llm.chatWithStreaming(chatOptions, callbackOptions);
};

// cmd
cli.cmd.command('daisyui').description('开始和daisyui对话').action(daisyui);
