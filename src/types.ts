enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum DBMethods {
  USER = 'getUserById',
  ALL = 'getAllUsers',
  CREATE = 'createUser',
  DELETE = 'deleteUser',
  UPDATE = 'updateUser',
}

type UserFromDB = {
  id: string;
  username: string;
  age: number;
  hobbies: string;
};

type PreparedResponse = {
  code: number;
  data: string | UserFromDB | UserFromDB[] | { message: string } | [] | ChangesInDB;
};

type ChangesInDB = {
  lastInsertRowid: number;
  changes: number;
};

type ReceivedData = {
  username: string;
  age: number;
  hobbies: string[];
};

export { Methods, UserFromDB, PreparedResponse, ReceivedData, DBMethods };
