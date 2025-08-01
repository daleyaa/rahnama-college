import { Debt } from "./get-group-debts";
import { getGroup } from "./get-group";

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
