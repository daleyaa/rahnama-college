import { expenses, groups } from "../../database/data";
import { Expense } from "../../routes/expense.route";
import { IsUserInGroup } from "../group/is-user-in-group";
import { getGroup } from "../group/get-group";

export const getUserDebts = (id: string, groupId?: string) => {

  if (!groupId) {
    const userGroups = groups.filter((group) => (group.userIds.includes(id)));

    return userGroups.reduce<Expense[]>((pre, cur) => {
      return [...pre, ...expenses.filter((expense) => (
        (expense.groupId === cur.id) &&
        (expense.payerId !== id)
      ))];
    }, []);

  } else {

    const group = getGroup(groupId);
    IsUserInGroup(id, group);
    return expenses.filter((expense) => (
      (expense.groupId === groupId) &&
      (expense.payerId !== id)
    ));
  }
}