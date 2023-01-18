"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("../routes"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
dotenv_1.default.config({
    path: process.env.NODE_ENV === "develop" ? ".env.test" : ".env",
});
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)());
server.use("/v1", routes_1.default);
server.use("/v1/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
exports.default = server;
