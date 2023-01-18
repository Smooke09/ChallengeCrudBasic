import supertest from "supertest";
import server from "./config/server";

import knexfile from "../knexfile";

if (process.env.NODE_ENV === "test") {
  const knex = require("knex")(knexfile.testJest);
}

export const testServer = supertest(server);
