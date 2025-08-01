import { Router } from "express";
import { users } from "./user.route";
import { isNonEmptyString } from "../../utility/non-empty-string";
import { createProgramDto } from "../modules/program/dto/create-program.dto";
import { handleExpress } from "../../utility/handle-express";
import { createProgram } from "../modules/program/create-program";
import { loginMiddleware } from "../login.middleware";
import { ZodError } from "zod";
export const app = Router();

export interface Program {
  id: number;
  planId: number;
  title: string;
  description: string;
  userId: string,
}

app.post("/", loginMiddleware, (req, res) => {
  try {
    const dto = createProgramDto.parse(req.body);
    handleExpress(res, () => createProgram(dto, req.user));
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: error.message });
    }
  }
})