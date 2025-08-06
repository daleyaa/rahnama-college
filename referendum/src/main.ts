import { app } from "./api";
import { AppDataSource } from "./data-source";
import { User } from "./modules/user/model/user";
import { seedUser } from "./seed";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
AppDataSource.initialize()
  .then(() => seedUser())
  .then(() => {
    app.listen(3000, () => console.log(`Listening on Port 3000`));
  });
