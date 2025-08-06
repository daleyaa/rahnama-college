import request from "supertest";
import { app } from "../src/api";
import { loginAdminTest, createPlanTest, loginRepTest } from "./utility";
import { AppDataSource } from "../src/data-source";
import { seedUser } from "../src/seed";

describe("Plan", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedUser();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("Create", () => {
    it("should fail if we did not login", async () => {
      await request(app).post("/plan").expect(401);
    });

    it("Should fail if user is not admin", async () => {
      const { body: user } = await loginRepTest();
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      const plan = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title: "plan1",
          description: "test create",
          deadline: tomorrow

        })
        .expect(403);
      return plan;
    })

    it("should Create a plan if we are logged in", async () => {
      const { body: plan } = await createPlanTest();
      expect(plan.title).toBe("plan1");
    });

    it("should send bad request if title is not provided", async () => {
      const { body: user } = await loginAdminTest();

      await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          description: "test create"

        })
        .expect(400);
    });
  });

  describe("Read", () => {

    it("should read the plan", async () => {
      const { body: plan } = await createPlanTest();
      const { body: resultPlan } = await request(app).get("/plan/" + plan.id).expect(200);
      expect(resultPlan.title).toBe("plan1");
    });
  });
});