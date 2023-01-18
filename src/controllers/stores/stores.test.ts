import knexfile from "../../../knexfile";
import { testServer } from "../../jest.setup";

describe("Stores Controller", () => {
  beforeAll(async () => {
    const knex = require("knex")(knexfile.testJest);

    // Rollback migrations
    await knex.migrate.rollback();

    // Run migrations
    await knex.migrate.latest();

    // Run seeds
    await knex.seed.run();
  });

  it("should return a list of stores", async () => {
    const response = await testServer.get("/stores");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Stores found successfully");
  });

  it("should return a store by id", async () => {
    const response = await testServer.get("/stores/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Store found successfully");
  });

  it("should create a store", async () => {
    const response = await testServer.post("/stores/create").send({
      store_name: "Nome do restaurante JEST",
      store_type:
        "Tipo do estabelecimento ex: Restaurante, Bar, Lanchonete, etc... JEST",
      store_address: "Endereço do restaurante JEST",
      store_city: "Cidade do restaurante JEST",
      store_business_hours: [
        {
          id: 5,
          day_of_week: "Sexta-feira",
          open_time: "08:00",
          close_time: "22:00",
        },
      ],
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("Store created successfully");
  });

  it("should update a store", async () => {
    const response = await testServer.put("/stores/update/1").send({
      store_name: "Nome do restaurante JEST",
      store_type:
        "Tipo do estabelecimento ex: Restaurante, Bar, Lanchonete, etc... JEST",
      store_address: "Endereço do restaurante JEST",
      store_city: "Cidade do restaurante JEST",
      store_business_hours: [
        {
          id: 5,
          day_of_week: "Sexta-feira",
          open_time: "08:00",
          close_time: "22:00",
        },
      ],
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Store updated successfully");
  });

  it("should update business hours of a store", async () => {
    const response = await testServer.put("/stores/1/business-hours").send({
      store_business_hours: [
        {
          id: 5,
          day_of_week: "Sexta-feira",
          open_time: "08:00",
          close_time: "20:00",
        },
      ],
    });
  });

  it("should inactive a store", async () => {
    const response = await testServer.put("/stores/inactive/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Store inactivated successfully");
  });

  it("should delete store", async () => {
    const response = await testServer.delete("/stores/delete/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Store deleted successfully");
  });
});
