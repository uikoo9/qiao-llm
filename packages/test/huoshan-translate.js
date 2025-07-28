// qiao
const { readFile } = require('qiao-file');

// md
const { splitMD } = require('md-segmenter');

// llm
const LLM = require('qiao-llm')({
  apiKey: require('./config.json').huoshan_key,
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

// translate
async function translate(translatePrompt, mdContent) {
  // chat options
  const chatOptions = {
    model: 'ep-20250721164252-zzmtx',
    messages: [
      { role: 'system', content: translatePrompt },
      { role: 'user', content: `请翻译下面的内容:${mdContent}` },
    ],
    thinking: {
      type: 'disabled',
    },
  };

  // go
  return await LLM.chat(chatOptions);
}

(async () => {
  // translate prompt
  const translatePrompt = await readFile('./prompt-translate.md');

  // translate md
  const translateMD = await readFile('./translate.md');
  const mds = splitMD(translateMD);

  // go
  for (let i = 0; i < mds.length; i++) {
    const mdContent = mds[i];
    const translateRes = await translate(translatePrompt, mdContent);
    console.log(`====${i}====`);
    console.log(mdContent);
    console.log('====after====');
    console.log(translateRes.content);
  }
})();
