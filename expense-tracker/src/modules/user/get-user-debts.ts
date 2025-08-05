import { expenses, groups } from "../../database/data";
import { Expense } from "../../routes/expense.route";
import { IsUserInGroup } from "../group/is-user-in-group";
import { getGroup } from "../group/get-group";

const getUserDebtsByGroupId = (id: string, groupId: string) => {
  const group = getGroup(groupId);
  IsUserInGroup(id, group);
  return expenses.filter((expense) => (
    (expense.groupId === groupId) &&
    (expense.payerId !== id)
  ))
}

export const getUserDebts = (id: string, groupId?: string) => {

  if (!groupId) {
    const userGroups = groups.filter((group) => (group.userIds.includes(id)));

    return userGroups.flatMap(userGroup => getUserDebtsByGroupId(id, userGroup.id))
    // return userGroups.reduce<Expense[]>((pre, cur) => {
    //   return [...pre, ...expenses.filter((expense) => (
    //     (expense.groupId === cur.id) &&
    //     (expense.payerId !== id)
    //   ))];
    // }, []);

  } else {
    return getUserDebtsByGroupId(id, groupId)
    // const group = getGroup(groupId);
    // IsUserInGroup(id, group);
    // return expenses.filter((expense) => (
    //   (expense.groupId === groupId) &&
    //   (expense.payerId !== id)
    // ));
  }
}

const arrayOfArrays = [[1, 2, 3], [4, 5, 6]]

const fn = (x: number[]) => {
  return [...x, 5]
}

let res1 = arrayOfArrays.map(fn)
console.log(res1) // [[1,2,3,5],[4,5,6,5]]

res1 = arrayOfArrays.reduce((prev, curr) => {
  return [...prev, fn(curr)]
}, [] as number[][])

let res2 = arrayOfArrays.flatMap(fn)
console.log(res2) // [1,2,3,5,4,5,6,5]
res2 = arrayOfArrays.reduce((prev, curr) => {
  return [...prev, ...fn(curr)]
}, [] as number[])