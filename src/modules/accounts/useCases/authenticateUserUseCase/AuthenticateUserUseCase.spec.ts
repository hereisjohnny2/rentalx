import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../respositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../respositories/in-memory/UsersTokenRepositoryInMemory";
import { IUsersRepository } from "../../respositories/IUsersRepository";
import { IUsersTokensRepository } from "../../respositories/IUsersTokensRepository";
import { CreateUserUseCase } from "../createUserUseCase/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let userTokensRepositoryInMemory: IUsersTokensRepository;
let createUserUseCase: CreateUserUseCase;
let dateProvider: IDateProvider;

describe("Authenticate Use", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "221313231",
      email: "user@test.com",
      name: "user test",
      password: "1234",
    };

    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non-existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "falsepass",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "221313231",
      email: "user@test.com",
      name: "user test",
      password: "1234",
    };

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "falsepass",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
