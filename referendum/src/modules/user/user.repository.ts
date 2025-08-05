import { v4 } from "uuid";
import { User } from "./model/user";

export class UserRepository {
  private users: User[] = [{
    id: v4(),
    username: "kosar",
    password: "1234",
    role: "Admin"
  }, {
    id: v4(),
    username: "Ali",
    password: "1234",
    role: "Representative"
  }];

  findByUsernameAndPassword(username: string, password: string) {
    return this.users.find((user) =>
      (user.username === username) &&
      (user.password === password)
    );
  }
  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}