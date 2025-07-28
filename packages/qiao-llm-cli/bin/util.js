// os
const os = require('os');

// path
const path = require('path');

// db
const DB = require('qiao-config');

/**
 * getDB
 * @returns
 */
exports.getDB = () => {
  const dbPath = path.resolve(os.homedir(), './qllm.json');
  return DB(dbPath);
};
