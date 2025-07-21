'use strict';

var OpenAI = require('openai');
var qiao_log_js = require('qiao.log.js');

// openai
const logger = qiao_log_js.Logger('qiao-llm');

// const chatOptions = {
//   model: 'ep-20250721164252-zzmtx',
//   messages: [
//     { role: 'system', content: '你是人工智能助手' },
//     { role: 'user', content: '常见的十字花科植物有哪些？' },
//   ],
//   thinking: {
//     // 不使用深度思考能力
//     type: 'disabled',
//     // 使用深度思考能力
//     type: 'enabled',
//     // 模型自行判断是否使用深度思考能力
//     type: 'auto',
//   },
// };

/**
 * qiao-llm
 */
var index = (options) => {
  // llm
  const llm = {};
  llm.openai = new OpenAI(options);

  // chat
  llm.chat = async (chatOptions) => {
    try {
      const completion = await llm.openai.chat.completions.create(chatOptions);
      return completion.choices[0]?.message?.content;
    } catch (error) {
      logger.error('llm.chat', 'error', error);
    }
  };

  // chat with streaming
  llm.chatWithStreaming = async (chatOptions, callback) => {
    try {
      chatOptions.stream = true;
      const stream = await llm.openai.chat.completions.create(chatOptions);

      // callback
      for await (const part of stream) {
        callback(part.choices[0]?.delta?.content || '');
      }
    } catch (error) {
      logger.error('llm.chat', 'error', error);
    }
  };

  //
  return llm;
};

module.exports = index;
