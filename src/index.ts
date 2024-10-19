import http from 'http';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const port = process.env.PORT;

const server = http.createServer(async (req, res) => {
  const result = await router(req);
  res.writeHead(result.code, { 'Content-Type': 'text/plain' });
  res.write(result.message);
  res.end();
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
