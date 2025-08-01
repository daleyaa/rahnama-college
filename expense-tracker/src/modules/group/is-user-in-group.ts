import { Group } from "../../routes/group.route";
import { HttpError } from "../../utility/handle-error";

export const IsUserInGroup = (userId: string, group: Group): boolean => {
  const userFound = group.userIds.find((id) => userId === id);
  if (!userFound) {
    throw new HttpError(404, "User Not Found")
  }
  return true;
}