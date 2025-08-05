import { HttpError } from "../../../utility/http-error";
import { User } from "./model/user";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  login(dto: { username: string; password: string }): User {
    const user = this.userRepo.findByUsernameAndPassword(dto.username, dto.password);
    if (user === undefined) {
      throw new HttpError(401, "Invalid username or password");
    }
    return user;
  }
  findById(id: string): User {
    const user = this.userRepo.findById(id);
    if (user === undefined) {
      throw new HttpError(404, "User Not Found");
    }
    return user;
  }

}