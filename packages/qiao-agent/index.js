'use strict';

var QiaoLLM = require('qiao-llm');

// qiao

/**
 * translateToZH
 * @param {*} config
 * @param {*} content
 * @returns
 */
const translateToZH = async (config, content) => {
  // prompt
  const systemPrompt = '你是一位精通英语和中文的智能助手，也比较熟悉中英文相互翻译。';
  const userPrompt = '请将下面的内容翻译为中文:';

  // go
  return await translate(config, systemPrompt, userPrompt, content);
};

/**
 * translateToEN
 * @param {*} config
 * @param {*} content
 * @returns
 */
const translateToEN = async (config, content) => {
  // prompt
  const systemPrompt =
    'You are an intelligent assistant proficient in both English and Chinese, and are also quite familiar with translating between the two languages.';
  const userPrompt = 'Please translate the following content into English:';

  // go
  return await translate(config, systemPrompt, userPrompt, content);
};

// translate
async function translate(config, systemPrompt, userPrompt, content) {
  // llm
  const LLM = QiaoLLM({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  });

  // chat options
  const chatOptions = {
    model: config.modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${userPrompt}${content}` },
    ],
    thinking: {
      type: 'disabled',
    },
  };

  // go
  return await LLM.chat(chatOptions);
}

exports.translateToEN = translateToEN;
exports.translateToZH = translateToZH;
