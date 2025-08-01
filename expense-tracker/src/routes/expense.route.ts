import { Router } from "express";
import { createExpense } from "../modules/expense/create-expense";
import { createExpenseDto } from "../modules/expense/dto/create-expense.dto";
import { HttpError } from "../utility/handle-error";
import { ZodError } from "zod";
import { getUser } from "../modules/user/get-user";
import { getGroup } from "../modules/group/get-group";
import { IsUserInGroup } from "../modules/group/is-user-in-group";

export const app = Router();

export interface Expense {
  id: string,
  groupId: string,
  title: string,
  expense: number,
  payerId: string,
}
app.post("/", (req, res) => {
  try {
    const dto = createExpenseDto.parse(req.body);

    const user = getUser(req.body.id);
    const group = getGroup(req.body.groupId);
    IsUserInGroup(user.id, group);

    const expense = createExpense(dto, group);

    res.status(200).send(expense);

  } catch (error) {

    if (error instanceof ZodError)
      res.status(400).send({ message: error.issues });

    else if (error instanceof HttpError)
      res.status(error.status).send({ message: error.message });
  }
});