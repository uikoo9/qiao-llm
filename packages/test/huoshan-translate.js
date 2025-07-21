// qiao
const { readFile } = require('qiao-file');
// llm
const LLM = require('qiao-llm')({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// main
async function main() {
  // translate prompt
  const translatePrompt = await readFile('./prompt-translate.md');

  // translate md
  const translateMD = await readFile('./translate.md');

  // chat options
  const chatOptions = {
    model: 'ep-20250721164252-zzmtx',
    messages: [
      { role: 'system', content: translatePrompt },
      { role: 'user', content: `请翻译下面的内容:${translateMD}` },
    ],
    thinking: {
      type: 'disabled',
    },
  };

  // go
  const res = await LLM.chat(chatOptions);
  console.log(res);
}

main();
