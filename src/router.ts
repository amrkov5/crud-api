import { IncomingMessage } from 'http';
import { Methods, PreparedResponse } from './types';
import handleGetRequest from './workers/get';
import handlePostRequest from './workers/post';
import deleteUserFromDb from './workers/delete';

const router = async (req: IncomingMessage) => {
  if (req.url && req.url.includes('/api/users')) {
    if (req.method) {
      if (req.method === Methods.GET) {
        const res: PreparedResponse = await handleGetRequest(req);
        return { code: res.code, data: JSON.stringify(res.data) };
      }
      if (req.method === Methods.POST) {
        let body = '';

        return new Promise((resolve, reject) => {
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', () => {
            let data;

            if (req.headers['content-type'] === 'application/json') {
              try {
                data = JSON.parse(body);
                const res = handlePostRequest(data);
                resolve(res);
              } catch (err) {
                return resolve({
                  code: 400,
                  data: JSON.stringify({ message: 'Bad request: Invalid JSON format' }),
                });
              }
            } else {
              return resolve({
                code: 400,
                data: JSON.stringify({ message: 'Bad request: Unsupported content type' }),
              });
            }
          });

          req.on('error', () => {
            reject({ code: 500, data: JSON.stringify({ message: 'Internal server error' }) });
          });
        });
      }
      if (req.method === Methods.PUT) {
        return { code: 400, message: 'bad' };
      }
      if (req.method === Methods.DELETE) {
        const res: PreparedResponse = deleteUserFromDb(req);
        return res;
      }
    }
  } else {
    return { code: 400, data: JSON.stringify({ message: 'Bad request' }) };
  }
};

export default router;
