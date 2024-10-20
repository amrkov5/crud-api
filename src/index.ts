import http from 'http';
import dotenv from 'dotenv';
import router from './router';
import { PreparedResponse } from './types';

dotenv.config();

const port = process.env.PORT;

const server = http.createServer(async (req, res) => {
  const result = (await router(req)) as PreparedResponse;
  res.writeHead(result.code, { 'Content-Type': 'application/json' });
  res.write(result.data);
  res.end();
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
