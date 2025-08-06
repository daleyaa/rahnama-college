import { HttpError } from "../../../utility/http-error";
import { LoginDto } from "./dto/login.dto";
import { User } from "./model/user";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async login({ username, password }: LoginDto) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new HttpError(401, "Invalid username or password");
    }
    if (user.password !== password) {
      throw new HttpError(401, "Invalid username or password");
    }
    return user;
  }
  findById(id: string) {
    return this.userRepo.findById(id);

  }

}