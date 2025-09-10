// path
import path from 'path';

// qiao
import { readFile } from 'qiao-file';

// llm
import QiaoLLM from 'qiao-llm';

// mcp
import { getMCPHTTPClient } from 'qiao-mcp';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-agent');

/**
 * genChart
 * @param {*} llmConfig
 * @param {*} userPrompt
 * @param {*} mcpUrl
 * @returns
 */
export const genChart = async (llmConfig, userPrompt, mcpUrl) => {
  const methodName = 'genChart';

  // check
  if (!llmConfig) {
    logger.warn(methodName, 'need llmConfig');
    return;
  }
  if (!llmConfig.apiKey) {
    logger.warn(methodName, 'need llmConfig.apiKey');
    return;
  }
  if (!llmConfig.baseURL) {
    logger.warn(methodName, 'need llmConfig.baseURL');
    return;
  }
  if (!llmConfig.modelID) {
    logger.warn(methodName, 'need llmConfig.modelID');
    return;
  }
  if (!llmConfig.modelThinking) {
    logger.warn(methodName, 'need llmConfig.modelThinking');
    return;
  }
  if (!llmConfig.modelThinking) {
    logger.warn(methodName, 'need llmConfig.modelThinking');
    return;
  }
  if (!userPrompt) {
    logger.warn(methodName, 'need userPrompt');
    return;
  }
  if (!mcpUrl) {
    logger.warn(methodName, 'need mcpUrl');
    return;
  }

  // llm
  const LLM = QiaoLLM({
    apiKey: llmConfig.apiKey,
    baseURL: llmConfig.baseURL,
  });

  // chat options
  const systemPromptPath = path.resolve(__dirname, './propmt/prompt-chart.md');
  const systemPrompt = await readFile(systemPromptPath);
  if (!systemPrompt) {
    logger.warn(methodName, 'read system prompt error');
    return;
  }
  const chatOptions = {
    model: llmConfig.modelID,
    thinking: {
      type: llmConfig.modelThinking,
    },
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  };

  // llm get tool
  const toolRes = await LLM.chat(chatOptions);
  if (!toolRes) {
    logger.warn(methodName, 'llm return tool fail');
    return;
  }
  logger.info(methodName, 'toolRes', toolRes);

  // parse tool
  let toolObj;
  try {
    const toolContent = toolRes.content;
    const toolJson = JSON.parse(toolContent);
    toolObj = toolJson[0];
    logger.info(methodName, 'toolObj', toolObj);
  } catch (error) {
    logger.warn(methodName, 'parse tool fail');
    logger.error(methodName, error);
    return;
  }

  // mcp
  const mcpClient = await getMCPHTTPClient({
    clientName: methodName,
    clientOnMessgae: (msg) => {
      logger.warn(methodName, 'clientOnMessgae', msg);
    },
    clientOnError: (error) => {
      logger.warn(methodName, 'clientOnError', error);
    },
    mcpUrl: mcpUrl,
    mcpOnError: (error) => {
      logger.warn(methodName, 'mcpOnError', error);
    },
  });
  logger.info(methodName, 'mcpClient init ok');

  // mcp run
  const result = await mcpClient.client.callTool({
    name: toolObj.name,
    arguments: toolObj.parameters,
  });
  logger.info(methodName, 'result', result);

  // close
  await mcpClient.client.close();

  // r
  return result;
};
