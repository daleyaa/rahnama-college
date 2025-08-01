import { expenses } from "../../database/data";
import { Expense } from "../../routes/expense.route";
import { Group } from "../../routes/group.route";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { v4 } from "uuid";

export const createExpense = (dto: CreateExpenseDto, group: Group): Expense => {
  const expense = {
    id: v4(),
    groupId: dto.groupId,
    title: dto.title,
    expense: dto.expense,
    payerId: dto.payerId
  }
  expenses.push(expense);
  group.expenseIds.push(expense.id);
  return expense;
}
