import express from 'express';
import { app as planRoutes } from './routes/plan.route';
import { app as userRoute } from './routes/user.route';
import { app as programRoute } from "./routes/program.route";
export const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "Test") {
  app.use((req, res, next) => {
    console.log(req.method, req.url);
  })
}
app.use("/plan", planRoutes);
app.use(userRoute);
app.use("/program", programRoute);
app.use((req, res) => {
  res.status(404).send({ Message: "Not Found" });
})