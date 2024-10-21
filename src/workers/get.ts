import { validate } from 'uuid';
import { IncomingMessage } from 'http';
import { DBMethods, PreparedResponse } from '../types';
import requestMaker from '../service/requestToDB';

const handleGetRequest = async (request: IncomingMessage) => {
  const paramsArr = request.url!.split('/').filter((el) => !!el);
  try {
    if (paramsArr.length > 2) {
      if (validate(paramsArr[2])) {
        const user = (await requestMaker(
          JSON.stringify({
            reqType: DBMethods.USER,
            userData: paramsArr[2],
          }),
        )) as PreparedResponse;
        if (user && user.code === 200) {
          return { code: 200, data: JSON.stringify(user.data) };
        }
        if (user && user.code === 404) {
          return { code: 404, data: JSON.stringify({ message: 'User not found' }) };
        }
        return { code: 500, data: JSON.stringify({ message: 'User not found' }) };
      } else {
        return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid user ID' }) };
      }
    } else {
      const users = (await requestMaker(JSON.stringify(DBMethods.ALL))) as PreparedResponse;
      if (users && users.code === 200) {
        return { code: 200, data: JSON.stringify(users.data) };
      } else {
        return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
      }
    }
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default handleGetRequest;
