import { Router } from "express";
import { User, users } from "./user.route";
import { isNonEmptyString } from "../../utility/non-empty-string";
import { HttpError } from "../../utility/http-error";
import { handleExpress } from "../../utility/handle-express";
import { getPlanById } from "../modules/plan/get-plan-by-id";
import { createPlan } from "../modules/plan/create-plan";
import { createPlanDto } from "../modules/plan/dto/create-plan.dto";
import z, { ZodError } from "zod";
import { Program } from "./program.route";
import { loginMiddleware } from "../login.middleware";


export const app = Router();

export interface Plan {
  id: number,
  title: string,
  description: string,
  deadline: Date;
  programs: Program[];
};
export const plans: Plan[] = [];

app.post("/", loginMiddleware, (req, res) => {

  try {
    const dto = createPlanDto.parse(req.body)
    handleExpress(res, () => createPlan(dto, req.user));
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: error.message });
    }
  }
});

app.get("/:id", (req, res) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    handleExpress(res, () => getPlanById(id));

  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: error.message });
    }
  }
});

