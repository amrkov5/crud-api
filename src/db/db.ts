import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    age INTEGER,
    hobbies TEXT
  )`);

db.exec(`INSERT INTO users (id, username, age, hobbies) VALUES
    ('9a751323-4d54-4eaf-adbc-1468fd292a12', 'Anton', 32, 'Reading,Sport'),
    ('b21493a9-be76-4aec-b509-fba61d25ae39', 'Maria', 25, 'Gaming,Football')
`);

export default db;
