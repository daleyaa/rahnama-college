import { Router } from "express";
import z, { ZodError } from "zod";
import { getGroupDebts } from "../modules/group/get-group-debts";
import { getGroupSettlement } from "../modules/group/get-group-settlement";
import { HttpError } from "../utility/handle-error";

export const app = Router();

export interface Group {
  id: string,
  userIds: string[],
  expenseIds: string[]
}

app.get("/:id/settlement", (req, res) => {
  try {
    const groupId = z.string().parse(req.params.id);
    const debts = getGroupDebts(groupId);

    const settlements = getGroupSettlement(debts, groupId);

    res.status(200).send(settlements);

  } catch (error) {

    if (error instanceof ZodError)
      res.status(400).send({ message: error.issues });

    else if (error instanceof HttpError)
      res.status(error.status).send({ message: error.message });
  }

})