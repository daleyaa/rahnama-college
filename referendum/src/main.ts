import { app } from "./api";
import { User } from "./routes/user.route";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
app.listen(3000, () => console.log(`Listening on Port 3000`));