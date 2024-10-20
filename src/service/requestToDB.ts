import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const dbPort = process.env.DB_PORT;

const requestMaker = async (data: string) => {
  const options = {
    hostname: 'localhost',
    port: dbPort,
    path: '/db',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const parsedData = JSON.parse(data);
        if (parsedData.code === 404) {
          resolve(undefined);
        }
        if (parsedData.code === 500) {
          resolve(parsedData);
        }
        resolve(JSON.stringify(parsedData.data));
      });
    });

    req.on('error', (err) => {
      console.error('Error:', err.message);
    });

    req.write(data);
    req.end();
  });
};

export default requestMaker;
