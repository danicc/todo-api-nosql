const config = {
  development: {
    db: 'mongodb://localhost:27017/todo',
    port: 3000,
    host: 'localhost',
  },
  test: {
    db: 'mongodb://localhost:27017/todoTest',
    port: 3000,
    host: 'localhost',
  },
  production: {
    db: process.env.DB_HOST,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },
};

export default config;
