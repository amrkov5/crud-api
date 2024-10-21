import supertest from 'supertest';
import { server, dbServer } from '../index';

describe('should test scenario 1', () => {
  let createdUser: {
    id?: string;
    username: string;
    age: number;
    hobbies: string[];
  };

  beforeAll((done) => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
    dbServer.listen(process.env.DB_PORT, () => {
      console.log(`DB is listening on port ${process.env.DB_PORT}`);
    });
    done();
  });

  afterAll(() => {
    server.close();
    dbServer.close();
  });

  it('GET should return an empty array', async () => {
    const response = await supertest(server).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST should create a user and return it', async () => {
    const newUser = {
      username: 'Test Testovich',
      age: 100500,
      hobbies: ['Sleep', 'Walk'],
    };
    const response = await supertest(server).post('/api/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.id).toHaveLength(36);
    expect(typeof response.body.id).toBe('string');
    expect(response.body.username).toStrictEqual(newUser.username);
    expect(response.body.age).toStrictEqual(newUser.age);
    expect(response.body.hobbies).toStrictEqual(newUser.hobbies);
    createdUser = response.body;
  });

  it('GET should return the created user', async () => {
    const response = await supertest(server).get(`/api/users/${createdUser.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(createdUser);
  });

  it('PUT should change the created user and return it', async () => {
    const modifiedUser = {
      id: createdUser.id,
      username: 'Test Passovich',
      age: 1,
      hobbies: ['Running', 'Coding'],
    };
    const response = await supertest(server).put(`/api/users/${createdUser.id}`).send(modifiedUser);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(modifiedUser);
  });

  it('DELETE should delete the user', async () => {
    const response = await supertest(server).delete(`/api/users/${createdUser.id}`);

    expect(response.status).toBe(204);
  });

  it('GET should return not found', async () => {
    const response = await supertest(server).get(`/api/users/${createdUser.id}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'User not found' });
  });

  it('GET should return an empty array after all manipulations', async () => {
    const response = await supertest(server).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
