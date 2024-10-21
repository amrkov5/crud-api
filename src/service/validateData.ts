import { ReceivedData } from '../types';

const validateData = (data: ReceivedData, whatToValidate = 'all') => {
  if (whatToValidate === 'all') {
    if (typeof data.name !== 'string') {
      return false;
    }
    if (typeof data.age !== 'number') {
      return false;
    }
    if (!Array.isArray(data.hobbies)) {
      return false;
    } else if ((data.hobbies as unknown[]).length > 0) {
      if (!(data.hobbies as unknown[]).every((el: unknown) => typeof el === 'string')) {
        return false;
      }
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
    if (!Array.isArray(data.hobbies)) {
      return false;
    } else if ((data.hobbies as unknown[]).length > 0) {
      if (!(data.hobbies as unknown[]).every((el: unknown) => typeof el === 'string')) {
        return false;
      }
    }
    return true;
  }
};

export default validateData;
