import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mappers/UserMap";
import { IUsersRepository } from "../../respositories/IUsersRepository";

@injectable()
class ShowUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ShowUserProfileUseCase };
