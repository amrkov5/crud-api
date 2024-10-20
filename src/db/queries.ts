import db from './db';

const getUserById = db.prepare('SELECT * FROM users WHERE id = ?');

const getAllUsers = db.prepare('SELECT * FROM users');

const createUser = db.prepare(
  'INSERT INTO users (id, name, age, hobbies) VALUES (?, ?, ?, ?) RETURNING id, name, age, hobbies',
);

const deleteUser = db.prepare('DELETE FROM users WHERE id = ?');

export { getUserById, getAllUsers, createUser, deleteUser };
