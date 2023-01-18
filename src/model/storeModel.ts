import { Model } from "objection";
import knex from "../database/connection";
// import type { Stores } from "../types/model/stores";

Model.knex(knex);

interface Stores {
  id: number;
  store_name: string;
  store_type: string;
  store_address: string;
  store_city: string;
  store_business_hours: string;
  store_is_active: boolean;
}

class Stores extends Model {
  static get tableName() {
    return "stores";
  }
}

export default Stores;
