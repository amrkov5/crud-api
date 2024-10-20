import { v4 as uuidv4 } from 'uuid';
import validateData from '../service/validateData';
import { DBMethods, ReceivedData } from '../types';
import requestMaker from '../service/requestToDB';

const handlePostRequest = async (data: ReceivedData) => {
  try {
    if (validateData(data)) {
      const res = await requestMaker(
        JSON.stringify({
          reqType: DBMethods.CREATE,
          userData: [uuidv4(), data.name, data.age, data.hobbies.join(',')],
        }),
      );
      return { code: 201, data: res };
    }
    return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid input data' }) };
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default handlePostRequest;
