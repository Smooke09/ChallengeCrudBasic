"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testServer = void 0;
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("./config/server"));
const knexfile_1 = __importDefault(require("../knexfile"));
if (process.env.NODE_ENV === "test") {
    const knex = require("knex")(knexfile_1.default.testJest);
}
exports.testServer = (0, supertest_1.default)(server_1.default);
