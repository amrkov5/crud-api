import { validate } from 'uuid';
import { getAllUsers, getUserById } from '../db/queries';
import { IncomingMessage } from 'http';

const handleGetRequest = async (request: IncomingMessage) => {
  const paramsArr = request.url!.split('/');
  console.log(paramsArr);
  if (paramsArr.length > 3) {
    if (validate(paramsArr[3])) {
      const user = getUserById.get(paramsArr[2]);
      if (user) {
        return JSON.stringify(user);
      } else {
        return 404;
      }
    } else {
      return 400;
    }
  } else {
    const users = getAllUsers.all();
    if (users) {
      return users;
    } else {
      return 400;
    }
  }
};

export default handleGetRequest;
