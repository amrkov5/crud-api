import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../db/queries';

const handlePostRequest = (data) => {
  try {
    const res = createUser.get(uuidv4(), data.name, data.age, data.hobbies);
    console.log('asdfadsfasdf', res);
  } catch (err) {
    console.log(err);
    return { code: 500, message: 'Internal server error' };
  }
};

export default handlePostRequest;
