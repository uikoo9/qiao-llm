// qiao
const cli = require('qiao-cli');

// db
const { getDB } = require('./util.js');
const db = getDB();

/**
 * remove
 */
const remove = async () => {
  try {
    // q a
    const questions = [
      {
        type: 'input',
        name: 'modelName',
        message: '请输入要删除的模型名称：',
      },
    ];
    const answers = await cli.ask(questions);
    console.log();

    // del
    const dbKey = answers.modelName;
    await db.config(dbKey, null);
    console.log(cli.colors.blue('模型已删除。'));
    console.log();

    // list
    const all = await db.all();
    console.log(all);
  } catch (e) {
    console.log(cli.colors.red('删除模型出错。'));
    console.log();

    console.log(e);
  }
};

// cmd
cli.cmd.command('remove').description('删除一个模型').action(remove);
