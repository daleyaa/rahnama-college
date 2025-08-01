import { createExpense } from "./create-expense";

describe("Create Expense", () => {
  it("should create an expense ", () => {
    const dto = {
      groupId: "2",
      title: "Nan",
      expense: 5_000,
      payerId: "1"
    }
    expect(
      createExpense(dto, {
        id: "1",
        userIds: [],
        expenseIds: []
      })
    ).toMatchObject(dto);
  });
});