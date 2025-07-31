// qiao
const cli = require('qiao-cli');

// db
const { getDB } = require('./util.js');
const db = getDB();

// llm
const LLM = require('../index.js');

/**
 * chat
 * @param {*} modelName
 */
const chat = async (modelName) => {
  try {
    // check
    const model = await db.config(modelName);
    if (!model) {
      console.log(cli.colors.red(`这个模型不存在：${modelName}`));
      return;
    }

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
        { role: 'system', content: '你是人工智能助手' },
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
    };

    // go
    await llm.chatWithStreaming(chatOptions, callbackOptions);
  } catch (e) {
    console.log(cli.colors.red('模型chat出错。'));
    console.log();

    console.log(e);
  }
};

// cmd
cli.cmd.command('chat <modelName>').description('开始和一个模型对话').action(chat);
