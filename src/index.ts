import http from 'http';
import dotenv from 'dotenv';
import router from './router';
import { PreparedResponse } from './types';

dotenv.config();

const port = process.env.PORT;

const server = http.createServer(async (req, res) => {
  const result: PreparedResponse = await router(req);
  res.writeHead(result.code, { 'Content-Type': 'application/json' });
  res.write(result.data);
  res.end();
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
