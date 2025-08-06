import request from "supertest";
import { Express } from "express";

export const loginAdminTest = async (app: Express) => {
  const user = await request(app)
    .post("/login")
    .send({ username: "kosar", password: "1234" })
    .expect(200);
  return user;
}
export const loginRepTest = async (app: Express) => {
  const user = await request(app)
    .post("/login")
    .send({ username: "Ali", password: "1234" })
    .expect(200);
  return user;
}

export const createPlanTest = async (app: Express) => {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const { body: user } = await loginAdminTest(app);
  const plan = await request(app)
    .post("/plan")
    .set("Authorization", user.id)
    .send({
      title: "plan1",
      description: "test create",
      deadline: tomorrow

    })
    .expect(200);
  return plan;
}
