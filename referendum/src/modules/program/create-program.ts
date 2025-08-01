import { ForbiddenError, HttpError, NotFoundError } from "../../../utility/http-error";
import { Plan, plans } from "../../routes/plan.route";
import { User } from "../../routes/user.route";
import { CreateProgramDto } from "./dto/create-program.dto";

export const createProgram = (dto: CreateProgramDto, user: User) => {
  const plan = plans.find((plan) => plan.id === dto.planId);
  if (plan === undefined) {
    throw new NotFoundError();
  }

  if (canCreateProgram(user, plan)) {
    plan.programs.push({
      id: plan.programs.length + 1,
      title: dto.title,
      description: dto.description || "",
      userId: user.id,
      planId: plan.id
    });
  } else {
    throw new HttpError(400, "program is not valid");
  }

}
export const canCreateProgram = (user: User, plan: Plan) => {
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