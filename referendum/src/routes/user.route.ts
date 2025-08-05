import { Router } from "express";
import { v4 } from "uuid";
import { isNonEmptyString } from "../../utility/non-empty-string";
import { loginDto } from "../modules/user/dto/login.dto";
import { handleExpress } from "../../utility/handle-express";
import { login } from "../modules/user/login";
import { ZodError } from "zod";

export const app = Router();

type UserRole = "Admin" | "Representative" | "Normal";

export interface User {
  id: string,
  username: string,
  password: string,
  role: UserRole
}

export const users: User[] = [{
  id: v4(),
  username: "kosar",
  password: "1234",
  role: "Admin"
}, {
  id: v4(),
  username: "Ali",
  password: "1234",
  role: "Representative"
}];

app.post("/login", (req, res) => {
  const dto = loginDto.parse(req.body);
  handleExpress<User>(res, () => login(dto));
})