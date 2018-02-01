const config = {
  development: {
    db: 'mongodb://localhost:27017/db',
    port: 3000,
    host: 'localhost',
  },
  test: {
    db: 'mongodb://localhost:27017/dbTest',
    port: 3000,
    host: 'localhost',
  },
};

export default config;
