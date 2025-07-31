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
  llm.chat = async (chatOptions) => {
    try {
      const completion = await llm.openai.chat.completions.create(chatOptions);
      return completion.choices[0]?.message;
    } catch (error) {
      logger.error('llm.chat', 'error', error);
    }
  };

  // chat with streaming
  llm.chatWithStreaming = async (chatOptions, callbakOptions) => {
    // callback
    const thinkingCallback = callbakOptions.thinkingCallback;
    const firstThinkingCallback = callbakOptions.firstThinkingCallback;
    const contentCallback = callbakOptions.contentCallback;
    const firstContentCallback = callbakOptions.firstContentCallback;
    const endCallback = callbakOptions.endCallback;
    const errorCallback = callbakOptions.errorCallback;

    try {
      chatOptions.stream = true;
      const stream = await llm.openai.chat.completions.create(chatOptions);

      // go
      let firstThinking = true;
      let firstContent = true;
      for await (const part of stream) {
        // thinking
        const thinkingContent = part.choices[0]?.delta?.reasoning_content;
        if (thinkingContent && thinkingCallback) {
          if (firstThinking && firstThinkingCallback) {
            firstThinking = false;
            firstThinkingCallback();
          }

          thinkingCallback(thinkingContent);
        }

        // content
        const content = part.choices[0]?.delta?.content;
        if (content && contentCallback) {
          if (firstContent && firstContentCallback) {
            firstContent = false;
            firstContentCallback();
          }

          contentCallback(content);
        }
      }

      // end
      if (endCallback) endCallback();
    } catch (error) {
      if (errorCallback) errorCallback(error);
    }
  };

  // chat with tools
  llm.chatWithTools = async (chatOptions, toolFunctions) => {
    try {
      // begin
      const completionBegin = await llm.openai.chat.completions.create(chatOptions);

      // tools
      const toolCall = completionBegin.choices[0]?.message?.tool_calls[0];
      const toolFunction = toolFunctions[toolCall.function?.name];
      if (!toolFunction) return completionBegin.choices[0]?.message?.content;

      // go
      const toolContent = await toolFunction(toolCall.function?.arguments);
      chatOptions.messages.push(completionBegin.choices[0].message);
      chatOptions.messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: toolContent,
      });

      // gogo
      const completionWithTool = await llm.openai.chat.completions.create(chatOptions);
      return completionWithTool.choices[0]?.message?.content;
    } catch (error) {
      logger.error('llm.chatWithTools', 'error', error);
    }
  };

  //
  return llm;
};

module.exports = index;
