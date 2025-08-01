import { getGroupDebts } from "./get-group-debts"

describe("Get group debts", () => {
  const debts = {
    "1": {
      "2": 10000,
    },
    "2": {
      "1": 20000
    },
    "3": {
      "1": 20000,
      "2": 10000
    }
  }
  it("get debts", () => {
    expect(
      getGroupDebts("3")
    ).toStrictEqual(debts)
  })
})