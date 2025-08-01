import { users } from "../../database/data";
import { HttpError } from "../../utility/handle-error";
import { getUser } from "./get-user";


describe("Get User", () => {
  it("should get a group ", () => {
    const user = users[0];
    expect(
      getUser(user!.id)
    ).toBe(user)
  });

  it("should throw User not found ", () => {
    expect(() =>
      getUser("20")
    ).toThrow(new HttpError(404, "User Not Found"));
  })
});