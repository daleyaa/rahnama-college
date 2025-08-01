import request from "supertest";
import { app } from "../src/api";
import { createPlanTest, loginAdminTest, loginRepTest } from "./utility";

describe("Program", () => {
  describe("Create", () => {
    it("Should fail if we did not login", async () => {
      await request(app).post("/program").expect(401);
    });

    it("should create a program", async () => {
      const { body: adminUser } = await loginAdminTest();
      const { body: repUser } = await loginRepTest();
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
      const { body: program } = await request(app)
        .post("/program")
        .set("Authorization", repUser.id)
        .send({
          title: "program1",
          planId: plan.id,
          description: "running"
        })
        .expect(200);
    });
  });

});