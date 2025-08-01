import { users } from "../../database/data";
import { User } from "../../routes/user.route";
import { HttpError } from "../../utility/handle-error";

export const getUser = (id: string): User => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new HttpError(404, "User Not Found");
  }
  return user;
}