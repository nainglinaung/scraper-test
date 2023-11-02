module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'superuser',
      password: 'poweruser12345',
      database: 'scraping',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};