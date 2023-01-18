"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const connection_1 = __importDefault(require("../database/connection"));
// import type { Stores } from "../types/model/stores";
objection_1.Model.knex(connection_1.default);
class Stores extends objection_1.Model {
    static get tableName() {
        return "stores";
    }
}
exports.default = Stores;
