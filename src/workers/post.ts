import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../db/queries';
import validateData from './validateData';
import { ReceivedData, UserFromDB } from '../types';

const handlePostRequest = (data: ReceivedData) => {
  try {
    if (validateData(data)) {
      const res = createUser.get(uuidv4(), data.name, data.age, data.hobbies.join(','));
      const resObj = Object.assign({}, res) as UserFromDB;
      const hobbiesArr = resObj.hobbies.split(',').filter((el: string) => el.length > 0);
      const result = { ...resObj, hobbies: hobbiesArr };
      return { code: 201, data: JSON.stringify(result) };
    }
    return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid input data' }) };
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default handlePostRequest;
