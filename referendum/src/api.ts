import express, { ErrorRequestHandler } from 'express';
import { app as planRoutes } from './routes/plan.route';
import { app as userRoute } from './routes/user.route';
import { ZodError } from 'zod';
export const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "Test") {
  app.use((req, res, next) => {
    console.log(req.method, req.url);
  })
}
app.use("/plan", planRoutes);
app.use(userRoute);


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