import { NextFunction, Request, Response } from "express";
import { userService } from "./dependency";

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers["authorization"];
  if (!userId) {
    res.status(401).send({ message: "unauthorized" });
    return;
  }
  const loggedInUser = userService.findById(userId)
  if (!loggedInUser) {
    res.status(401).send({ message: "unauthorized" });
    return;
  }
  req.user = loggedInUser;
  next();
}