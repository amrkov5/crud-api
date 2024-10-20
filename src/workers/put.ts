import { DBMethods, ReceivedData } from '../types';
import validateData from '../service/validateData';
import requestMaker from '../service/requestToDB';

const editUser = async (url: string, data: ReceivedData) => {
  const paramsArr = url.split('/').filter((el) => !!el);
  try {
    if (validateData(data)) {
      const res = await requestMaker(
        JSON.stringify({
          reqType: DBMethods.UPDATE,
          userData: [data.name, data.age, data.hobbies.join(','), paramsArr[2]],
        }),
      );
      if (res) {
        return { code: 200, data: res };
      }
      return { code: 404, data: JSON.stringify({ message: 'User not found' }) };
    }
    return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid input data' }) };
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default editUser;
