import { v4 } from "uuid";
import { User } from "./model/user";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { AppDataSource } from "../../data-source";

export class UserRepository {
  private userRepo: Repository<UserEntity>;
  constructor() {
    this.userRepo = AppDataSource.getRepository(UserEntity)
  }

  findById(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }
}