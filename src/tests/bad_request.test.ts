import supertest from 'supertest';

describe('testing bad request scenario', () => {
  const server = global.server;

  it('GET should return Bad request when invalid id entered', async () => {
    const response = await supertest(server).get(`/api/users/invalidID`);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'Bad request: Invalid user ID' });
  });

  it('POST should return Bad request when invalid data entered', async () => {
    const invalidUser1 = {
      username: 9203,
      age: '100500',
      hobbies: { data: 123 },
    };
    const invalidUser2 = {
      username: '9203',
    };

    const response1 = await supertest(server).post('/api/users').send(invalidUser1);

    expect(response1.status).toBe(400);
    expect(response1.body).toStrictEqual({ message: 'Bad request: Invalid input data' });

    const response2 = await supertest(server).post('/api/users').send(invalidUser2);

    expect(response2.status).toBe(400);
    expect(response2.body).toStrictEqual({ message: 'Bad request: Invalid input data' });
  });

  it('PUT should return Bad request when invalid id entered', async () => {
    const invalidUser = {
      username: 9203,
      age: '100500',
      hobbies: { data: 123 },
    };
    const response = await supertest(server).put(`/api/users/invalidId`).send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'Bad request: Invalid user ID' });
  });

  it('PUT should return Bad request when invalid data entered', async () => {
    const validNewUser = {
      username: 'Test Testovich',
      age: 100500,
      hobbies: ['Sleep', 'Walk'],
    };
    const invalidUser = {
      username: 9203,
      age: '100500',
      hobbies: { data: 123 },
    };
    let userId: string;

    const newUser = await supertest(server).post('/api/users').send(validNewUser);

    expect(newUser.status).toBe(201);
    expect(newUser.body.id).toHaveLength(36);
    expect(typeof newUser.body.id).toBe('string');
    expect(newUser.body.username).toStrictEqual(validNewUser.username);
    expect(newUser.body.age).toStrictEqual(validNewUser.age);
    expect(newUser.body.hobbies).toStrictEqual(validNewUser.hobbies);

    userId = newUser.body.id;

    const response = await supertest(server).put(`/api/users/${userId}`).send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'Bad request: Invalid input data' });
  });

  it('DELETE should return Bad request when invalid id entered', async () => {
    const response = await supertest(server).delete(`/api/users/invalidId`);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: 'Bad request: Invalid user ID' });
  });
});
