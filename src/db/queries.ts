import db from './db';

const getUserById = db.prepare('SELECT * FROM users WHERE id = ?');

const getAllUsers = db.prepare('SELECT * FROM users');

const createUser = db.prepare(`
  INSERT INTO users (id, name, age, hobbies)
  VALUES (?, ?, ?, ?)
  RETURNING id, name, age, hobbies
`);

export { getUserById, getAllUsers, createUser };
