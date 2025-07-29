// qiao
const cli = require('qiao-cli');

// db
const { getDB } = require('./util.js');
const db = getDB();

/**
 * add
 */
const add = async () => {
  try {
    // q a
    const questions = [
      {
        type: 'input',
        name: 'modelName',
        message: '请输入模型名称：',
      },
      {
        type: 'input',
        name: 'apiKey',
        message: '请输入apiKey：',
      },
      {
        type: 'input',
        name: 'baseURL',
        message: '请输入baseURL：',
      },
      {
        type: 'input',
        name: 'modelID',
        message: '请输入模型ID：',
      },
      {
        type: 'list',
        name: 'modelThinking',
        message: '是否启动思考模式：',
        choices: ['enabled', 'disabled', 'auto'],
      },
    ];
    const answers = await cli.ask(questions);
    console.log();

    // check
    const dbKey = answers.modelName;
    const dbValue = await db.config(dbKey);
    if (dbValue) {
      console.log(cli.colors.red('模型名称已经存在，请换一个模型名称。'));
      return;
    }

    // set
    await db.config(dbKey, answers);
    console.log(cli.colors.blue('模型已添加，目前记录的模型信息有：'));
    console.log();

    // list
    const all = await db.all();
    console.log(all);
  } catch (e) {
    console.log(cli.colors.red('设置模型出错。'));
    console.log();
    console.log(e);
  }
};

// cmd
cli.cmd.command('add').description('添加一个模型').action(add);
