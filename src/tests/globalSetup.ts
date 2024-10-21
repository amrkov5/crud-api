import { Server } from 'http';
import { server, dbServer } from '../index';

declare global {
  var server: Server;
  var dbServer: Server;
}

export default async () => {
  global.server = server;
  global.dbServer = dbServer;

  await Promise.all([
    new Promise((resolve) => {
      global.server.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
        resolve(1);
      });
    }),
    new Promise((resolve) => {
      global.dbServer.listen(process.env.DB_PORT, () => {
        console.log(`Server is listening on port ${process.env.DB_PORT}`);
        resolve(1);
      });
    }),
  ]);
};
