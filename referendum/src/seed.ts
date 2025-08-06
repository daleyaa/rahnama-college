import { v4 } from "uuid";
import { AppDataSource } from "./data-source"

export const seedUser = async () => {
  const userRepo = AppDataSource.getRepository("UserEntity");
  const count = await userRepo.count();
  if (count === 0) {
    await userRepo.save([{
      id: v4(),
      username: "kosar",
      password: "1234",
      role: "Admin"
    }, {
      id: v4(),
      username: "Ali",
      password: "1234",
      role: "Representative"
    }])
  }
}