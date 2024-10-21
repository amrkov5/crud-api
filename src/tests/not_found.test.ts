import supertest from 'supertest';

describe('testing not found scenario', () => {
  const id = '3e314c19-1530-406a-8395-68ad83015790';
  const server = global.server;

  it('GET should return Not found when there is no such user', async () => {
    const response = await supertest(server).get(`/api/users/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'User not found' });
  });

  it('PUT should return Not found when there is no such user', async () => {
    const validUser = {
      username: 'Test Testovich',
      age: 100500,
      hobbies: ['Sleep', 'Walk'],
    };
    const response = await supertest(server).put(`/api/users/${id}`).send(validUser);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'User not found' });
  });

  it('DELETE should return Not found when there is no such user', async () => {
    const response = await supertest(server).delete(`/api/users/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'User not found' });
  });

  it('APP should return Not found when invalid URL entered', async () => {
    const response = await supertest(server).get(`/invalid/api/entered/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: 'Not found: Invalid URL' });
  });
});
