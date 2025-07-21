'use strict';

var OpenAI = require('openai');
var qiao_log_js = require('qiao.log.js');

// openai
const logger = qiao_log_js.Logger('qiao-llm');

/**
 * qiao-llm
 */
var index = (options) => {
  // llm
  const llm = {};
  llm.openai = new OpenAI(options);

  // chat
  llm.chat = async (messages, model) => {
    try {
      const completion = await llm.openai.chat.completions.create({
        messages: messages,
        model: model,
      });
      return completion.choices[0]?.message?.content;
    } catch (error) {
      logger.error('llm.chat', 'error', error);
    }
  };

  // chat with streaming
  llm.chatWithStreaming = async (messages, model, callback) => {
    try {
      const stream = await llm.openai.chat.completions.create({
        messages: messages,
        model: model,
        stream: true,
      });

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
