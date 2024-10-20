import { UserFromDB } from '../types';

const normalizeDBResponse = (data: UserFromDB | UserFromDB[]) => {
  if (Array.isArray(data)) {
    const result = data.map((el: UserFromDB) => {
      const hobbiesArr = el.hobbies.split(',').filter((el: string) => el.length > 0);
      return { ...el, hobbies: hobbiesArr };
    });
    return result;
  } else {
    const resObj = Object.assign({}, data) as UserFromDB;
    const hobbiesArr = resObj.hobbies.split(',').filter((el: string) => el.length > 0);
    return { ...resObj, hobbies: hobbiesArr };
  }
};

export default normalizeDBResponse;
