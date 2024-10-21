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
    try {
      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            if (parsedData.code === 404) {
              resolve({ code: 404, data: 'Not found' });
            }
            if (parsedData.code === 500) {
              resolve({ code: 500, data: 'Internal server error' });
            }
            resolve(parsedData);
          } catch {
            resolve({ code: 500, data: 'Internal server error' });
          }
        });
      });

      req.on('error', () => {
        resolve({ code: 500, data: 'Internal server error' });
      });

      req.write(data);
      req.end();
    } catch {
      resolve({ code: 500, data: 'Internal server error' });
    }
  });
};

export default requestMaker;
