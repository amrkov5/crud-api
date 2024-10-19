import { IncomingMessage } from 'http';
import { Methods } from './types';
import handleGetRequest from './workers/get';
import handlePostRequest from './workers/post';

const router = async (req: IncomingMessage) => {
  console.log(req.url, req.method);
  if (req.url && req.url.includes('/api/users')) {
    if (req.method) {
      if (req.method === Methods.GET) {
        const res = await handleGetRequest(req);
        console.log('resssss', res);
        if (res !== 400 || res !== 404) {
          return { code: 200, message: 'good', data: res };
        }
        return { code: res, message: 'bad' };
      }
      if (req.method === Methods.POST) {
        let body = '';

        return new Promise((resolve, reject) => {
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', () => {
            console.log('Request ended');
            console.log('Full body:', body);
            let data;

            if (req.headers['content-type'] === 'application/json') {
              try {
                data = JSON.parse(body);
                const res = handlePostRequest(data);
                resolve({ code: 200, data: res });
              } catch (err) {
                return resolve({ code: 400, message: 'Bad request: Invalid JSON format' });
              }
            } else {
              return resolve({ code: 400, message: 'Bad request: Unsupported content type' });
            }

            console.log('Parsed data:', data);
            resolve({ code: 200, message: 'Data received', data });
          });

          req.on('error', (err) => {
            console.error('Request error:', err);
            reject({ code: 500, message: 'Internal server error' });
          });
        });
      }
      if (req.method === Methods.PUT) {
        return { code: 400, message: 'bad' };
      }
      if (req.method === Methods.DELETE) {
        return { code: 400, message: 'bad' };
      }
    }
  } else {
    return { code: 400, message: 'Bad request' };
  }
};

export default router;
