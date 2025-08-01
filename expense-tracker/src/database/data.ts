import { Expense } from "../routes/expense.route";
import { Group } from "../routes/group.route";
import { User } from "../routes/user.route";

export const users: User[] = [
  {
    id: '1',
    groupIds: ['1', '2', '3']
  }, {
    id: '2',
    groupIds: ['2', '3']
  }, {
    id: '3',
    groupIds: ['1', '3']
  }
]

export const groups: Group[] = [
  {
    id: '1',
    userIds: ['1', '3'],
    expenseIds: ["1", "2", "3"],
  }, {
    id: '2',
    userIds: ['1', '2'],
    expenseIds: ["4", "5", "8"],
  }, {
    id: '3',
    userIds: ['1', '2', '3'],
    expenseIds: ["7", "6"],
  }
]

export const expenses: Expense[] = [
  {
    id: "1",
    groupId: "1",
    title: "mast",
    expense: 20_000,
    payerId: "1",
  },
  {
    id: "2",
    groupId: "1",
    title: "kheyar",
    expense: 28_000,
    payerId: "1",
  },
  {
    id: "3",
    groupId: "1",
    title: "kaho",
    expense: 35_000,
    payerId: "3",
  }, {
    id: "4",
    groupId: "2",
    title: "limo",
    expense: 20_000,
    payerId: "1",
  }, {
    id: "5",
    groupId: "2",
    title: "goje",
    expense: 35_000,
    payerId: "1",
  }, {
    id: "6",
    groupId: "3",
    title: "mash",
    expense: 30_000,
    payerId: "2",
  }, {
    id: "7",
    groupId: "3",
    title: "nakhod",
    expense: 60_000,
    payerId: "1",
  }, {
    id: "8",
    groupId: "2",
    title: "adas",
    expense: 20_000,
    payerId: "2",
  }

]
