import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';

/**
 * Split Markdown content into structural chunks while preserving block integrity
 * @param {string} mdContent - Input Markdown content
 * @param {Object} options - Configuration options
 * @param {number} [options.maxChunkSize=3000] - Maximum character count per chunk
 * @returns {string[]} Array of Markdown chunks
 */
export const splitMD = (mdContent, options = {}) => {
  // Validate input parameters
  if (typeof mdContent !== 'string') {
    throw new TypeError('Input content must be a valid string');
  }

  // Initialize processor with unified pipeline
  const processor = unified().use(remarkParse).use(remarkStringify);

  // Parse to Markdown AST (Abstract Syntax Tree)
  const ast = processor.parse(mdContent);

  // Destructure options with defaults
  const { maxChunkSize = 3000 } = options;
  if (!Number.isInteger(maxChunkSize) || maxChunkSize <= 0) {
    throw new RangeError('maxChunkSize must be a positive integer');
  }

  // Precalculate node metrics
  const nodeMetrics = ast.children.map((node) => {
    const textContent = processor.stringify(node);
    return {
      node,
      text: textContent,
      length: textContent.length,
    };
  });

  // Segment nodes into chunks
  const chunks = [];
  let currentChunk = [];
  let accumulatedSize = 0;

  for (const metric of nodeMetrics) {
    // Handle nodes exceeding chunk size limit alone
    if (metric.length > maxChunkSize) {
      // Commit existing chunk before oversize node
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
        currentChunk = [];
        accumulatedSize = 0;
      }
      chunks.push([metric.node]);
      continue;
    }

    // Check chunk capacity
    if (accumulatedSize + metric.length > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = [];
      accumulatedSize = 0;
    }

    // Add node to current chunk
    currentChunk.push(metric.node);
    accumulatedSize += metric.length;
  }

  // Commit remaining nodes
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  // Convert AST chunks to Markdown strings
  return chunks.map((chunkNodes) => {
    const chunkAST = {
      type: 'root',
      children: chunkNodes,
    };
    return processor.stringify(chunkAST);
  });
};
