import { Router } from "express";
import z, { ZodError } from "zod";
import { HttpError } from "../utility/handle-error";
import { getUserExpenses } from "../modules/user/get-user-expenses";
import { getUserDebts } from "../modules/user/get-user-debts";

export const app = Router();

export interface User {
  id: string,
  groupIds: string[],
}
app.get("/:id/expenses", (req, res) => {
  try {
    const id = z.string().parse(req.params.id);
    const groupId = req.query.groupId ? z.string().parse(req.query.groupId) : undefined;
    const filteredExpenses = getUserExpenses(id, groupId);

    res.status(200).send(filteredExpenses);

  } catch (error) {

    if (error instanceof ZodError)
      res.status(400).send({ message: error.issues });

    else if (error instanceof HttpError)
      res.status(error.status).send({ message: error.message });
  }
})




app.get("/:id/debts", (req, res) => {
  try {
    const id = z.string().parse(req.params.id);
    const groupId = req.query.groupId ? z.string().parse(req.query.groupId) : undefined;
    const filteredExpenses = getUserDebts(id, groupId)

    res.status(200).send(filteredExpenses);

  } catch (error) {

    if (error instanceof ZodError)
      res.status(400).send({ message: error.issues });

    else if (error instanceof HttpError)
      res.status(error.status).send({ message: error.message });
  }
})