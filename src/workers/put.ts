import { updateUser } from '../db/queries';
import { ReceivedData, UserFromDB } from '../types';
import validateData from './validateData';

const editUser = (url: string, data: ReceivedData) => {
  const paramsArr = url.split('/').filter((el) => !!el);
  try {
    if (validateData(data)) {
      const res = updateUser.get(data.name, data.age, data.hobbies.join(','), paramsArr[2]);
      const resObj = Object.assign({}, res) as UserFromDB;
      const hobbiesArr = resObj.hobbies.split(',').filter((el: string) => el.length > 0);
      const result = { ...resObj, hobbies: hobbiesArr };
      return { code: 200, data: JSON.stringify(result) };
    }
    return { code: 400, data: JSON.stringify({ message: 'Bad request: Invalid input data' }) };
  } catch {
    return { code: 500, data: JSON.stringify({ message: 'Internal server error' }) };
  }
};

export default editUser;
