import { ForbiddenError, HttpError } from "../../../utility/http-error"
import { canCreateProgram, createProgram } from "./create-program"

describe("Create Program", () => {
  it("should not create program if user is not representative", () => {
    expect(() =>
      canCreateProgram(
        { username: "kosar", password: "1234", id: "asdtasdft", role: 'Normal' },
        { id: 1, title: 'oromie', programs: [], description: "", deadline: new Date() }
      )
    ).toThrow(ForbiddenError);
  });

  it("should not create program if user already have a program", () => {
    expect(
      canCreateProgram(
        {
          username: "kosar",
          password: "1234",
          id: "1",
          role: 'Representative'
        },
        {
          id: 1,
          title: 'oromie',
          programs: [
            { id: 1, title: "fbb", description: "", userId: "1", planId: 1 }
          ],
          description: "",
          deadline: new Date()
        }
      )
    ).toBe(false);
  });


  it("should not create program if plan deadline exceed from today", () => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1))
    expect(
      canCreateProgram(
        {
          username: "kosar",
          password: "1234",
          id: "2",
          role: 'Representative'
        },
        {
          id: 1,
          title: 'oromie',
          programs: [
            { id: 1, title: "fbb", description: "", userId: "1", planId: 1 }
          ],
          description: "",
          deadline: yesterday
        }
      )
    ).toBe(false);
  });
  it("should return true", () => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1))
    expect(
      canCreateProgram(
        {
          username: "kosar",
          password: "1234",
          id: "2",
          role: 'Representative'
        },
        {
          id: 1,
          title: 'oromie',
          programs: [
            { id: 1, title: "fbb", description: "", userId: "1", planId: 1 }
          ],
          description: "",
          deadline: tomorrow
        }
      )
    ).toBe(true);
  });
});