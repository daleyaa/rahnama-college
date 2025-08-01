import { expenses } from "../../database/data";
import { Expense } from "../../routes/expense.route";
import { getGroup } from "../group/get-group";
import { IsUserInGroup } from "../group/is-user-in-group";

export const getUserExpenses = (id: string, groupId?: string): Expense[] => {

  if (!groupId) {
    return expenses.filter((expense) => expense.payerId === id);
  } else {
    const group = getGroup(groupId);
    IsUserInGroup(id, group);
    return expenses.filter((expense) => (
      (expense.payerId === id) &&
      (expense.groupId === groupId))
    );
  }
}