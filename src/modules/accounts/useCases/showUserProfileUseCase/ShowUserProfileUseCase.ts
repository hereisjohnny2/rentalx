import { inject, injectable } from "tsyringe";

import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../respositories/IUsersRepository";

@injectable()
class ShowUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}

export { ShowUserProfileUseCase };
