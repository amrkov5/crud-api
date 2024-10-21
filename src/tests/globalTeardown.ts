module.exports = async () => {
  await new Promise<void>((resolve) => {
    global.server.close(() => {
      console.log('Server stopped');
      resolve();
    });
  });
  await new Promise<void>((resolve) => {
    global.dbServer.close(() => {
      console.log('Server stopped');
      resolve();
    });
  });
};
