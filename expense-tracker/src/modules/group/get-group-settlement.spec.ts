import { getGroupDebts } from "./get-group-debts"
import { getGroupSettlement } from "./get-group-settlement"

describe("Get group settlement", () => {
  const debts = {
    "1": {
      "2": 10000,
    },
    "2": {
      "1": 20000,
    },
    "3": {
      "1": 20000,
      "2": 10000
    }
  }
  const resultDebts = {
    "1": {
      "2": 0,
    },
    "2": {
      "1": 10000
    },
    "3": {
      "1": 20000,
      "2": 10000
    }
  }
  it("get all settlement need for this group", () => {
    expect(
      getGroupSettlement(debts, "3")
    ).toStrictEqual(resultDebts)
  })
})