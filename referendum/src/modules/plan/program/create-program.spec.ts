import { ForbiddenError, HttpError } from "../../../../utility/http-error";
import { Plan } from "../model/plan";
import { CreatePlan, CreateProgram, IPlanRepository } from "../plan.repository";
import { PlanService } from "../plan.service";

class MockPlanRepo implements IPlanRepository {
  plans: Plan[] = []
  async create(plan: CreatePlan): Promise<Plan> {
    this.plans.push({
      id: 1,
      ...plan,
    });
    return {
      id: 1,
      ...plan,
    }
  }
  findById(id: number): Promise<Plan | null> {
    throw new Error("Method not implemented.");
  }
  addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
    throw new Error("Method not implemented.");
  }
}
describe("Create Program", () => {
  let planService: PlanService;
  beforeEach(() => {
    planService = new PlanService(new MockPlanRepo());
  });
  it("should not create program if user is not representative", () => {
    expect(() =>
      planService.canCreateProgram(
        { username: "kosar", password: "1234", id: "asdtasdft", role: 'Normal' },
        { id: 1, title: 'oromie', programs: [], description: "", deadline: new Date() }
      )
    ).toThrow(ForbiddenError);
  });

  it("should not create program if user already have a program", () => {
    expect(
      planService.canCreateProgram(
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
      planService.canCreateProgram(
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
      planService.canCreateProgram(
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
            { id: 1, title: "fbb", description: "", userId: "1", "planId": 1 }
          ],
          description: "",
          deadline: tomorrow
        }
      )
    ).toBe(true);
  });
});