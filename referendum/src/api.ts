import express, { ErrorRequestHandler } from 'express';
import { DataSource } from 'typeorm';
import { ZodError } from 'zod';
import { makePlanRouter } from './routes/plan.route';
import { PlanRepository } from './modules/plan/plan.repository';
import { PlanService } from './modules/plan/plan.service';
import { UserRepository } from './modules/user/user.repository';
import { UserService } from './modules/user/user.service';
import { makeUserRouter } from './routes/user.route';

export const makeApp = (datasource: DataSource) => {
  const app = express();
  app.use(express.json());

  if (process.env.NODE_ENV !== "Test") {
    app.use((req, res, next) => {
      console.log(req.method, req.url);
    })
  }

  const planRepo = new PlanRepository(datasource);
  const planService = new PlanService(planRepo);

  const userRepo = new UserRepository(datasource);
  const userService = new UserService(userRepo);

  app.use("/plan", makePlanRouter(planService, userService));
  app.use(makeUserRouter(userService));


  app.use((req, res) => {
    res.status(404).send({ Message: "Not Found" });
  })
  const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
      res.status(400).send({ message: error.message });
    }
    res.status(500).send();
  }
  app.use(errorHandler);
  return app;
}