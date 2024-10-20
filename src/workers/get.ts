import { validate } from 'uuid';
import { getAllUsers, getUserById } from '../db/queries';
import { IncomingMessage } from 'http';
import { UserFromDB } from '../types';

const handleGetRequest = async (request: IncomingMessage) => {
  const paramsArr = request.url!.split('/').filter((el) => !!el);
  console.log(paramsArr);
  if (paramsArr.length > 2) {
    if (validate(paramsArr[2])) {
      const user = getUserById.get(paramsArr[2]) as UserFromDB | undefined;
      if (user) {
        return { code: 200, data: user };
      } else {
        return { code: 404, data: 'Not found' };
      }
    } else {
      return { code: 400, data: 'Bad request' };
    }
  } else {
    const users = getAllUsers.all() as UserFromDB[] | [];
    if (users) {
      return { code: 200, data: users };
    } else {
      return { code: 400, data: 'Bad request' };
    }
  }
};

export default handleGetRequest;
