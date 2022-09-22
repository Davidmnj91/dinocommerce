const user = process.env.MONGO_USER || 'admin';
const password = process.env.MONGO_PASSWORD || 'admin';
const database = process.env.DATABASE_NAME || 'dinocommerce';

db.createUser({
  user: user,
  pwd: password,
  roles: [
    {
      role: 'readWrite',
      db: database,
    },
  ],
});
