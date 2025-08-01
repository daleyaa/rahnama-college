import { groups } from "../../database/data";
import { HttpError } from "../../utility/handle-error";
import { getGroup } from "./get-group";

describe("Get Group", () => {
  it("should get a group ", () => {
    const group = groups[0];
    expect(
      getGroup(group!.id)
    ).toBe(group)
  });

  it("should throw group not found ", () => {
    const group = groups[0];
    expect(() =>
      getGroup("20")
    ).toThrow(new HttpError(404, "Group Not Found"));
  })
});