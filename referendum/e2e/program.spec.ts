import request from "supertest";
import { Express } from "express";
import { createPlanTest, loginAdminTest, loginRepTest } from "./utility";
import { AppDataSource } from "../src/data-source";
import { seedUser } from "../src/seed";
import { makeApp } from "../src/api";

describe("Program", () => {
  let app: Express
  beforeAll(async () => {
    const dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
  describe("Create", () => {
    it("Should fail if we did not login", async () => {
      const { body: adminUser } = await loginAdminTest(app);
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));

      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", adminUser.id)
        .send({
          title: "plan1",
          description: "test create",
          deadline: tomorrow

        })
        .expect(200);
      await request(app).post(`/plan/${plan.id}/program`).expect(401);
    });

    it("should create a program", async () => {
      const { body: adminUser } = await loginAdminTest(app);
      const { body: repUser } = await loginRepTest(app);
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));

      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", adminUser.id)
        .send({
          title: "plan1",
          description: "test create",
          deadline: tomorrow

        })
        .expect(200);

      const { body: planWithProgram } = await request(app)
        .post(`/plan/${plan.id}/program`)
        .set("Authorization", repUser.id)
        .send({
          title: "program2",
          description: "running"
        })
        .expect(200);
      expect(planWithProgram.programs).toHaveLength(1);

    });
  });

});