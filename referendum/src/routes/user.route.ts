import { Router } from "express";
import { v4 } from "uuid";
import { isNonEmptyString } from "../../utility/non-empty-string";
import { loginDto } from "../modules/user/dto/login.dto";
import { handleExpress } from "../../utility/handle-express";
import { ZodError } from "zod";
import { User } from "../modules/user/model/user";
import { UserService } from "../modules/user/user.service";

export const makeUserRouter = (userService: UserService) => {
  const app = Router();
  app.post("/login", (req, res) => {
    const dto = loginDto.parse(req.body);
    handleExpress<User>(res, () => userService.login(dto));
  });
  return app;
}
