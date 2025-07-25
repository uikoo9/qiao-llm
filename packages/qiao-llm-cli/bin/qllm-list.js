// qiao
const cli = require('qiao-cli');

// db
const DB = require('qiao-config');
const db = DB();

/**
 * list
 */
const list = async () => {
  try {
    // list
    const all = await db.all();
    console.log(all);
  } catch (e) {
    console.log('列出模型出错。');
    console.log();

    console.log(e);
  }
};

// cmd for file
cli.cmd.command('list').description('列出目前记录的模型信息').action(list);
