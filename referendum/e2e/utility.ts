import request from "supertest";
import { app } from "../src/api";

export const loginAdminTest = async () => {
  const user = await request(app)
    .post("/login")
    .send({ username: "kosar", password: "1234" })
    .expect(200);
  return user;
}
export const loginRepTest = async () => {
  const user = await request(app)
    .post("/login")
    .send({ username: "Ali", password: "1234" })
    .expect(200);
  return user;
}

export const createPlanTest = async () => {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const { body: user } = await loginAdminTest();
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
