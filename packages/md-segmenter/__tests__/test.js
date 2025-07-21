// ava
const test = require('ava');

// qiao
const { readFile } = require('qiao-file');

// splitMD
const { splitMD } = require('../index.js');

// test
test('split long md', async (t) => {
  const longMD = await readFile('./__tests__/long.md');
  const mdChunks = splitMD(longMD);
  t.log(mdChunks.length);
  t.pass();
});
