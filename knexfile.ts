import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

// Update with your config settings.
const knexfile: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 5432,
      ssl: { rejectUnauthorized: false },
    },

    migrations: {
      directory: __dirname + "/src/database/migrations",
    },
    seeds: {
      directory: __dirname + "/src/database/seeds",
    },
  },
  testJest: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "password",
      database: "testeJest_restaurantys",
      charset: "utf8",
    },
    migrations: {
      directory: __dirname + "/src/database/migrations",
    },
    seeds: {
      directory: __dirname + "/src/database/seeds",
    },
  },
};

export default knexfile;
