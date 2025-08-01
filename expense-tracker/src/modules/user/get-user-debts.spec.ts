import { HttpError } from "../../utility/handle-error"
import { getUserDebts } from "./get-user-debts"
import { getUserExpenses } from "./get-user-expenses"

describe("Get all of the debts that the user has payed", () => {
  const debts = [
    {
      "id": "4",
      "groupId": "2",
      "title": "limo",
      "expense": 20000,
      "payerId": "1"
    },
    {
      "id": "5",
      "groupId": "2",
      "title": "goje",
      "expense": 35000,
      "payerId": "1"
    },
    {
      "id": "7",
      "groupId": "3",
      "title": "nakhod",
      "expense": 60000,
      "payerId": "1"
    }
  ]
  const debtsGroup = [
    {
      "id": "4",
      "groupId": "2",
      "title": "limo",
      "expense": 20000,
      "payerId": "1"
    },
    {
      "id": "5",
      "groupId": "2",
      "title": "goje",
      "expense": 35000,
      "payerId": "1"
    },
  ]

  it("get debts", () => {
    expect(
      getUserDebts("2")
    ).toStrictEqual(debts)
  })
  it("get debts By group", () => {
    expect(
      getUserDebts("2", "2")
    ).toStrictEqual(debtsGroup)
  })
  it("throw error user is not in group", () => {
    expect(() =>
      getUserDebts("2", "1")
    ).toThrow(new HttpError(404, "User Not Found"))
  })
})