module.exports = {
  '**/*': () => ['npm run build', 'npm run prettier', 'npm run eslint', 'npm run test'],
};
