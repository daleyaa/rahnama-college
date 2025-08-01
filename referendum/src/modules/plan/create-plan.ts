import { HttpError } from "../../../utility/http-error";
import { plans } from "../../routes/plan.route";
import { User } from "../../routes/user.route";
import { CreatePlanDto, createPlanDto } from "./dto/create-plan.dto";

export const createPlan = (
  dto: CreatePlanDto,
  loggedInUser: User
) => {
  const plan = {
    id: plans.length + 1,
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
  plans.push(plan);
  return plan;
}