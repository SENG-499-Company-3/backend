const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT);
const DB_USERNAME = process.env.DB_ADMIN;
const DB_PASSWORD = process.env.DB_ADMIN_PASS;

export default {
  database: {
    url: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
  }
};
