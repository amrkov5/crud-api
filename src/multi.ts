import cluster from 'cluster';
import http from 'http';
import { availableParallelism } from 'os';
import process from 'process';
import router from './router';
import dotenv from 'dotenv';
import { PreparedResponse } from './types';

const numCPUs = availableParallelism();

dotenv.config();

const port = process.env.PORT;

let workerPort = Number(port);
let currentWorker = Number(port) + 1;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs - 1; i += 1) {
    if (workerPort) {
      workerPort += 1;
      cluster.fork({ PORT: workerPort });
    }
  }

  const loadBalancer = http.createServer(async (req, res) => {
    const proxyRequest = http.request(
      {
        port: currentWorker,
        method: req.method,
        path: req.url,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);

        proxyRes.pipe(res, { end: true });
      },
    );

    req.pipe(proxyRequest, { end: true });
    currentWorker =
      currentWorker + 1 > Number(port) + numCPUs - 1 ? Number(port) + 1 : currentWorker + 1;
  });

  loadBalancer.listen(port, () => {
    console.log(`Load Balancer is listening on port ${port}`);
  });
} else {
  const server = http.createServer(async (req, res) => {
    const result = (await router(req)) as PreparedResponse;
    res.writeHead(result.code, { 'Content-Type': 'application/json' });
    res.write(result.data);
    res.end();
  });

  server.listen(workerPort, () => {
    console.log(`Server ${process.pid} is listening on port ${port}`);
  });
}
