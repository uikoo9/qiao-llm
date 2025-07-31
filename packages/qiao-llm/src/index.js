// openai
import OpenAI from 'openai';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-llm');

/**
 * qiao-llm
 */
export default (options) => {
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
  llm.chatWithStreaming = async (chatOptions, callback, thinkingCallback) => {
    try {
      chatOptions.stream = true;
      const stream = await llm.openai.chat.completions.create(chatOptions);

      // callback
      let firstThinking = true;
      let firstContent = true;
      for await (const part of stream) {
        const thinkingContent = part.choices[0]?.delta?.reasoning_content;
        if (thinkingContent && thinkingCallback) {
          if (firstThinking) {
            console.log();
            thinkingCallback('====思考中====');
            console.log();
            firstThinking = false;
          }

          thinkingCallback(part.choices[0]?.delta?.reasoning_content);
        }

        const content = part.choices[0]?.delta?.content;
        if (content && callback) {
          if (firstContent) {
            console.log();
            callback('====回复中====');
            console.log();
            firstContent = false;
          }
          callback(part.choices[0]?.delta?.content);
        }
      }
    } catch (error) {
      logger.error('llm.chat', 'error', error);
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
