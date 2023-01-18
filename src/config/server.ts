import express from "express";
import dotenv from "dotenv";
import swaggerDocument from "./swagger_output.json";
import swaggerUi from "swagger-ui-express";
import router from "../routes";
import cors from "cors";

const server = express();

dotenv.config({
  path: process.env.NODE_ENV === "develop" ? ".env.test" : ".env",
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/v1", router);

server.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default server;
