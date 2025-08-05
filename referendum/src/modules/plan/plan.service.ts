import { ForbiddenError, HttpError, NotFoundError } from "../../../utility/http-error";
import { User } from "../../routes/user.route";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { Plan } from "./model/plan";
import { PlanRepository } from "./plan.repository";
import { CreateProgramDto } from "./program/dto/create-program.dto";
import { Program } from "./program/model/program";

export class PlanService {
  private planRepo: PlanRepository;
  constructor() {
    this.planRepo = new PlanRepository();
  }
  getPlanById(planId: number) {
    const plan = this.planRepo.findById(planId);
    if (plan === undefined) {
      throw new HttpError(404, "Plan Not Found");
    }

    return plan;
  }
  createProgram(dto: CreateProgramDto, user: User): Program {
    const plan = this.planRepo.findById(dto.planId);
    if (plan === undefined) {
      throw new NotFoundError();
    }

    if (this.canCreateProgram(user, plan)) {
      return this.planRepo.addProgram(plan, {
        title: dto.title,
        description: dto.description || "",
        userId: user.id,
      })

    }
    throw new HttpError(400, "program is not valid");

  }
  createPlan(
    dto: CreatePlanDto,
    loggedInUser: User,
  ) {
    const plan = {
      title: dto.title,
      description: dto.description || "",
      deadline: dto.deadline,
      programs: [],
    };
    if (dto.deadline.getTime() < new Date().getTime()) {
      throw new HttpError(400, "you should not use a deadline in the past");
    }
    if (loggedInUser.role !== "Admin") {
      throw new HttpError(403, "you are not authorized");
    }
    return this.planRepo.create(plan);
  }

  public canCreateProgram = (user: User, plan: Plan) => {
    if (user.role !== "Representative") {
      throw new ForbiddenError(); //Code smell
    }
    const program = plan.programs.find((program) => program.userId === user.id);
    if (program) {
      return false;
    }
    if (new Date().getTime() > plan.deadline.getTime()) {
      return false;
    }
    return true;
  }

}