import { validate } from 'uuid';
import { getAllUsers, getUserById } from '../db/queries';
import { IncomingMessage } from 'http';
import { UserFromDB } from '../types';

const handleGetRequest = async (request: IncomingMessage) => {
  const paramsArr = request.url!.split('/').filter((el) => !!el);
  try {
    if (paramsArr.length > 2) {
      if (validate(paramsArr[2])) {
        const user = getUserById.get(paramsArr[2]) as UserFromDB | undefined;
        if (user) {
          const resObj = Object.assign({}, user) as UserFromDB;
          const result = { ...resObj, hobbies: resObj.hobbies.split(',') };
          console.log(result);
          return { code: 200, data: result };
        } else {
          return { code: 404, data: { message: 'User Not found' } };
        }
      } else {
        return { code: 400, data: { message: 'Bad request: Invalid user ID' } };
      }
    } else {
      const users = getAllUsers.all() as UserFromDB[] | [];
      if (users) {
        const result = users.map((el: UserFromDB) => {
          return { ...el, hobbies: el.hobbies.split(',') };
        });
        return { code: 200, data: result };
      } else {
        return { code: 500, data: { message: 'Internal server error' } };
      }
    }
  } catch {
    return { code: 500, data: { message: 'Internal server error' } };
  }
};

export default handleGetRequest;
