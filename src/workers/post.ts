import { v4 as uuidv4 } from 'uuid';
import validateData from '../service/validateData';
import { DBMethods, PreparedResponse, ReceivedData } from '../types';
import requestMaker from '../service/requestToDB';

const handlePostRequest = async (data: ReceivedData) => {
  try {
    if (validateData(data)) {
      const res = (await requestMaker(
        JSON.stringify({
          reqType: DBMethods.CREATE,
          userData: [uuidv4(), data.name, data.age, data.hobbies.join(',')],
        }),
      )) as PreparedResponse;
      if (res && res.code === 201) {
        return { code: 201, data: JSON.stringify(res.data) };
      }
      if (res && res.code === 500) {
        return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
      }
    }
    return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid input data' }) };
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default handlePostRequest;
