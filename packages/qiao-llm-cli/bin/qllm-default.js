// qiao
const cli = require('qiao-cli');

// db
const { getDB } = require('./util.js');
const db = getDB();

/**
 * defaultModel
 */
const defaultModel = async (modelName) => {
  try {
    // get keys
    const all = await db.all();
    const keys = Object.keys(all);

    // check keys
    if (!keys || !keys.length) {
      console.log(cli.colors.red('请先添加模型：qllm add'));
      console.log();
      return;
    }

    // check model
    if (!keys.includes(modelName)) {
      console.log(cli.colors.red('没有找到这个模型，已添加模型如下：'));
      console.log();
      console.log(all);
      return;
    }

    // set
    await db.config('default', modelName);
    console.log(cli.colors.blue(`默认模型设置成功：${modelName}`));
    console.log();
  } catch (e) {
    console.log(cli.colors.red('设置默认模型出错。'));
    console.log();
    console.log(e);
  }
};

// cmd
cli.cmd.command('default <modelName>').description('将某个模型设置为默认模型').action(defaultModel);
