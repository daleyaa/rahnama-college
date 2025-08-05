import { Debt } from "./get-group-debts";
import { getGroup } from "./get-group";
import { expenses } from "../../database/data";

export const getGroupSettlement = (debts: Debt, groupId: string) => {
  const group = getGroup(groupId);
  const usersIds = group.userIds;

  for (let i = 0; i < usersIds.length; i++) {
    for (let j = i + 1; j < usersIds.length; j++) {

      const user1 = usersIds[i];
      const user2 = usersIds[j];

      if (!user1 || !user2) {  //Impossible
        continue;
      }
      if (debts[user1] && debts[user2] && debts[user1][user2] && debts[user2][user1]) {

        if (debts[user1][user2] > debts[user2][user1]) {

          debts[user1][user2] -= debts[user2][user1];
          debts[user2][user1] = 0;

        } else if (debts[user1][user2] < debts[user2][user1]) {

          debts[user2][user1] -= debts[user1][user2];
          debts[user1][user2] = 0;

        } else {

          debts[user2][user1] = debts[user1][user2] = 0;
        }
      }
    }
  }
  return debts;
}

const getGroupExpense = (groupId: string) => {
  return expenses.filter(exp => exp.groupId === groupId)
}

const getGroupDebtAmin = (groupId: string) => {
  // const group = getGroup(groupId);
  // const usersIds = group.userIds;

  const groupExpenses = getGroupExpense(groupId)

  const payments = groupExpenses.reduce((prev, curr) => {
    prev[curr.payerId] = (prev[curr.payerId] ?? 0) + curr.expense
    return prev


    // totalSum: 800


  }