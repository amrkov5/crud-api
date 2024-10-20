import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    age INTEGER,
    hobbies TEXT
  )`);

db.exec(`INSERT INTO users (id, name, age, hobbies) VALUES
    ('1', 'Anton', 32, 'Reading'),
    ('2', 'Maria', 25, 'Gaming')
`);

export default db;
