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

  //
  return llm;
};
