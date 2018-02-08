const config = {
  development: {
    db: 'mongodb://localhost:27017/db',
    port: 3000,
    host: 'localhost',
    SECRET_TOKEN: 'secret_token',
  },
  test: {
    db: 'mongodb://localhost:27017/dbTest',
    port: 3000,
    host: 'localhost',
    SECRET_TOKEN: 'secret_token',
  },
};

export default config;
