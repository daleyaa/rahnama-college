import { HttpError } from "../../utility/handle-error"
import { getUserExpenses } from "./get-user-expenses"

describe("Get all of the expenses that the user has payed", () => {
  const expenses = [
    {
      "id": "3",
      "groupId": "1",
      "title": "kaho",
      "expense": 35000,
      "payerId": "3"
    }
  ]

  it("get expenses", () => {
    expect(
      getUserExpenses("3")
    ).toStrictEqual(expenses)
  })
  it("get expenses By group", () => {
    expect(
      getUserExpenses("3", "1")
    ).toStrictEqual(expenses)
  })
  it("throw error user is not in group", () => {
    expect(() =>
      getUserExpenses("3", "2")
    ).toThrow(new HttpError(404, "User Not Found"))
  })
})