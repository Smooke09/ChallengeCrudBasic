import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stores", (table) => {
    table.increments("id").primary();
    table.string("store_name").notNullable();
    table.string("store_type").notNullable();
    table.string("store_address").notNullable();
    table.string("store_city").notNullable();
    table.text("store_business_hours").notNullable();
    table.boolean("store_is_active").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("stores");
}
