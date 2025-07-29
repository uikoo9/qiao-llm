// qiao
const cli = require('qiao-cli');

// db
const { getDB } = require('./util.js');
const db = getDB();

/**
 * list
 */
const list = async () => {
  try {
    // list
    const all = await db.all();
    console.log(cli.colors.blue('目前已经添加的模型有：'));
    console.log();
    console.log(all);
  } catch (e) {
    console.log(cli.colors.red('列出模型出错。'));
    console.log();

    console.log(e);
  }
};

// cmd
cli.cmd.command('list').description('列出目前记录的模型信息').action(list);
