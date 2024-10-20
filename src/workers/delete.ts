import { IncomingMessage } from 'http';
import { validate } from 'uuid';
import requestMaker from '../service/requestToDB';
import { DBMethods } from '../types';

const deleteUserFromDb = async (request: IncomingMessage) => {
  const paramsArr = request.url!.split('/').filter((el) => !!el);
  try {
    if (validate(paramsArr[2])) {
      const res = (await requestMaker(
        JSON.stringify({
          reqType: DBMethods.DELETE,
          userData: paramsArr[2],
        }),
      )) as string;
      if (JSON.parse(res).changes > 0) {
        return { code: 204, data: JSON.stringify({ message: 'User has been deleted' }) };
      }
      return { code: 404, data: JSON.stringify({ message: 'User not found' }) };
    } else {
      return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid user ID' }) };
    }
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default deleteUserFromDb;
