import supertest from "supertest";
import server from "./config/server";

export const testServer = supertest(server);
