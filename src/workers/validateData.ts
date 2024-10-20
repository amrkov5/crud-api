import { ReceivedData } from '../types';

const validateData = (data: ReceivedData, whatToValidate = 'all') => {
  if (whatToValidate === 'all') {
    if (typeof data.name !== 'string') {
      console.log('name');
      return false;
    }
    if (typeof data.age !== 'number') {
      console.log('age');
      return false;
    }
    if (!Array.isArray(data.hobbies)) {
      console.log('arr');
      return false;
    }
    if (!data.hobbies.every((el: unknown) => typeof el === 'string')) {
      console.log('hobbies');
      return false;
    }
    return true;
  }
  if (whatToValidate === 'name') {
    if (typeof data.name !== 'string') {
      return false;
    }
    return true;
  }
  if (whatToValidate === 'age') {
    if (typeof data.age !== 'number') {
      return false;
    }
    return true;
  }
  if (whatToValidate === 'hobbies') {
    if (!!Array.isArray(data.hobbies)) {
      return false;
    } else {
      if (!(data.hobbies as unknown[]).every((el: unknown) => typeof el === 'string')) {
        return false;
      }
    }
    return true;
  }
};

export default validateData;
