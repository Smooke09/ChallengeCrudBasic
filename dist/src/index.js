"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./config/server"));
server_1.default.listen(3333, () => {
    console.log({
        message: "Server is running",
        port: 3333,
        env: process.env.NODE_ENV,
    });
});
