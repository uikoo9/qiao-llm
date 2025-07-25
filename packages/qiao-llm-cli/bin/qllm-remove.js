// qiao
const cli = require('qiao-cli');

// db
const DB = require('qiao-config');
const db = DB();

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

    // del
    const dbKey = answers.modelName;
    await db.config(dbKey, null);
    console.log('模型已删除。');

    // list
    const all = await db.all();
    console.log(all);
  } catch (e) {
    console.log('删除模型出错。');
    console.log();

    console.log(e);
  }
};

// cmd
cli.cmd.command('remove').description('删除一个模型').action(remove);
