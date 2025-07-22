(async () => {
  const app = await require('qiao-z')({
    cros: true,
  });
  app.listen(7001);
})();
