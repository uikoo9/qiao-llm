'use strict';

var QiaoLLM = require('qiao-llm');
var path = require('path');
var qiaoFile = require('qiao-file');
var qiaoMcp = require('qiao-mcp');
var qiao_log_js = require('qiao.log.js');

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

// path
const logger = qiao_log_js.Logger('qiao-agent');

/**
 * genChart
 * @param {*} llmConfig
 * @param {*} userPrompt
 * @param {*} mcpUrl
 * @returns
 */
const genChart = async (llmConfig, userPrompt, mcpUrl) => {
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
  const systemPromptPath = path.resolve(__dirname, './prompt/prompt-chart.md');
  const systemPrompt = await qiaoFile.readFile(systemPromptPath);
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
  const mcpClient = await qiaoMcp.getMCPHTTPClient({
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

exports.genChart = genChart;
exports.translateToEN = translateToEN;
exports.translateToZH = translateToZH;
