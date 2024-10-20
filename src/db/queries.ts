import db from './db';

const getUserById = db.prepare('SELECT * FROM users WHERE id = ?');

const getAllUsers = db.prepare('SELECT * FROM users');

const createUser = db.prepare(
  'INSERT INTO users (id, username, age, hobbies) VALUES (?, ?, ?, ?) RETURNING id, username, age, hobbies',
);

const deleteUser = db.prepare('DELETE FROM users WHERE id = ?');

const updateUser = db.prepare(`
  UPDATE users
  SET username = ?, age = ?, hobbies = ?
  WHERE id = ?
  RETURNING id, username, age, hobbies
`);

export { getUserById, getAllUsers, createUser, deleteUser, updateUser };
