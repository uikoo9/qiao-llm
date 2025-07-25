// qiao
const cli = require('qiao-cli');

// db
const DB = require('qiao-config');
const db = DB();

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
      console.log(`这个模型不存在：${modelName}`);
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
        type: 'input',
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

    // go
    await llm.chatWithStreaming(chatOptions, (msg) => {
      process.stdout.write(msg);
    });
  } catch (e) {
    console.log('模型chat出错。');
    console.log();

    console.log(e);
  }
};

// cmd
cli.cmd.command('chat <modelName>').description('开始和一个模型对话').action(chat);
