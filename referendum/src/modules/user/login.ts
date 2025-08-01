import { HttpError } from "../../../utility/http-error";
import { User, users } from "../../routes/user.route";
import { LoginDto } from "./dto/login.dto";

export const login = (dto: LoginDto): User => {
  const user = users.find((user) =>
    (user.username === dto.username) &&
    (user.password === dto.password)
  );
  if (user === undefined) {
    throw new HttpError(401, "Invalid username or password");
  }
  return user;
}
