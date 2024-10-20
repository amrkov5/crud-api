enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type UserFromDB = {
  id: string;
  name: string;
  age: number;
  hobbies: string;
};

type PreparedResponse = {
  code: number;
  data: string | UserFromDB | UserFromDB[] | { message: string } | [];
};

type ReceivedData = {
  name: string;
  age: number;
  hobbies: string[];
};

export { Methods, UserFromDB, PreparedResponse, ReceivedData };
