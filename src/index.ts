import http from 'http';
import dotenv from 'dotenv';
import router from './router';
import { PreparedResponse } from './types';
import dbWorker from './db/dbworker';

dotenv.config();

const port = process.env.PORT;
const dbPort = process.env.DB_PORT;

const dbServer = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/db') {
    const result = await dbWorker(req);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(result);
    res.end();
  }
});

dbServer.listen(dbPort, () => {
  console.log(`DB is listening on port ${dbPort}`);
});

const server = http.createServer(async (req, res) => {
  const result = (await router(req)) as PreparedResponse;
  res.writeHead(result.code, { 'Content-Type': 'application/json' });
  res.write(result.data);
  res.end();
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
