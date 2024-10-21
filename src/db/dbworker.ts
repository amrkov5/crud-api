import { IncomingMessage } from 'node:http';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './queries';
import { DBMethods, UserFromDB } from '../types';
import normalizeDBResponse from '../service/normalizeDbResponse';

const dbWorker = async (res: IncomingMessage) => {
  let data = '';

  return new Promise((resolve) => {
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(data);
      try {
        if (parsedData === DBMethods.ALL) {
          const users = getAllUsers().all() as UserFromDB[] | [];
          const result = normalizeDBResponse(users);
          resolve(JSON.stringify({ code: 200, data: result }));
        }
        if (parsedData.reqType === DBMethods.USER) {
          const user = getUserById().get(parsedData.userData) as UserFromDB;
          if (user) {
            const result = normalizeDBResponse(user);
            resolve(JSON.stringify({ code: 200, data: result }));
          } else {
            resolve(JSON.stringify({ code: 404, data: 'Not found' }));
          }
        }
        if (parsedData.reqType === DBMethods.CREATE) {
          const user = createUser().get(...parsedData.userData) as UserFromDB;
          const result = normalizeDBResponse(user);
          resolve(JSON.stringify({ code: 201, data: result }));
        }
        if (parsedData.reqType === DBMethods.DELETE) {
          const result = deleteUser().run(parsedData.userData);
          resolve(JSON.stringify({ code: 204, data: result }));
        }
        if (parsedData.reqType === DBMethods.UPDATE) {
          const user = updateUser().get(...parsedData.userData) as UserFromDB;
          const result = normalizeDBResponse(user);
          resolve(JSON.stringify({ code: 200, data: result }));
        }
      } catch {
        resolve(JSON.stringify({ code: 500, data: 'Internal server error' }));
      }
    });
  });
};

export default dbWorker;
