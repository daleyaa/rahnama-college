import { v4 } from "uuid";
import { User } from "./model/user";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { AppDataSource } from "../../data-source";
import { seedUser } from "../../seed";

export class UserRepository {
  private userRepo: Repository<UserEntity>;
  constructor(appDataSource: DataSource) {
    this.userRepo = appDataSource.getRepository(UserEntity);
    seedUser();
  }

  findById(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }
}