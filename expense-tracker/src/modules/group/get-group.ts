import { groups } from "../../database/data";
import { Group } from "../../routes/group.route";
import { HttpError } from "../../utility/handle-error";

export const getGroup = (id: string): Group => {
  const group = groups.find((group) => group.id === id);
  if (!group) {
    throw new HttpError(404, "Group Not Found");
  }
  return group;
}