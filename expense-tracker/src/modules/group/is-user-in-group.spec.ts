import { HttpError } from "../../utility/handle-error"
import { IsUserInGroup } from "./is-user-in-group"

describe("Is user in group", () => {
  it("should be get error user not found", () => {
    expect(() =>
      IsUserInGroup("3", {
        id: "2",
        userIds: ["1", "2"],
        expenseIds: ["4", "5", "6"]
      })
    ).toThrow(new HttpError(404, "User Not Found"))
  });

  it("User founded", () => {
    expect(
      IsUserInGroup("1", {
        id: "2",
        userIds: ["1", "2"],
        expenseIds: ["4", "5", "6"]
      })
    ).toBe(true)
  })
})