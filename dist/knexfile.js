"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Update with your config settings.
const knexfile = {
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
};
exports.default = knexfile;
