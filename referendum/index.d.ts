import { User } from "./src/routes/user.route";

declare namespace Express {
  export interface Request {
    user?: User;
  }
}