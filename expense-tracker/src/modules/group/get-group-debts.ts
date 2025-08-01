import { expenses, groups } from "../../database/data";
import { User } from "../../routes/user.route";
import { getGroup } from "./get-group";

//rec of <payerId,<recipientId, expense>>
export type Debt = Record<string, Record<string, number>>;

export const getGroupDebts = (groupId: string): Debt => {
  const debts: Debt = {};

  const groupExpenses = expenses.filter((expense) => expense.groupId === groupId);
  const group = getGroup(groupId);
  const groupUserLen = group.userIds.length;

  groupExpenses.map((currentExpense) => {

    const debtShare = Math.ceil(currentExpense.expense / groupUserLen);
    const payerId = currentExpense.payerId;

    group.userIds.map((userId) => {
      if (userId !== payerId) {
        if (debts[userId]) {
          if (debts[userId][payerId]) {
            debts[userId][payerId] += debtShare;
          } else {
            debts[userId] = { ...debts[userId], [payerId]: debtShare };
          }
        } else {
          debts[userId] = { [payerId]: debtShare }
        }
      }
    })
  })
  return debts;
}