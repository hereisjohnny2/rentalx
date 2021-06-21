import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokenRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[];

  constructor() {
    this.usersTokens = [];
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userTokens);

    return userTokens;
  }
}

export { UsersTokenRepositoryInMemory };
