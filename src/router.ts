import { IncomingMessage } from 'http';
import { Methods } from './types';
import handleGetRequest from './workers/get';
import handlePostRequest from './workers/post';
import deleteUserFromDb from './workers/delete';
import editUser from './workers/put';

const router = async (req: IncomingMessage) => {
  const paramsArr = req.url!.split('/').filter((el) => !!el);

  if (req.url && paramsArr[0] === 'api' && paramsArr[1] === 'users') {
    if (req.method) {
      if (req.method === Methods.GET) {
        const res = await handleGetRequest(req);
        return res;
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
        let body = '';

        return new Promise((resolve, reject) => {
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', () => {
            let data;

            if (req.headers['content-type'] === 'application/json') {
              try {
                if (req.url) {
                  data = JSON.parse(body);
                  const res = editUser(req.url, data);
                  resolve(res);
                } else {
                  return resolve({
                    code: 400,
                    data: JSON.stringify({ message: 'Bad request: No user id in URL' }),
                  });
                }
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
      if (req.method === Methods.DELETE) {
        const res = deleteUserFromDb(req);
        return res;
      }
    }
  } else {
    return { code: 404, data: JSON.stringify({ message: 'Not found: Invalid URL' }) };
  }
};

export default router;
