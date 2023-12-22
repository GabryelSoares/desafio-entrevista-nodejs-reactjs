export default () => ({
  // port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USERNAME,
  },
});
