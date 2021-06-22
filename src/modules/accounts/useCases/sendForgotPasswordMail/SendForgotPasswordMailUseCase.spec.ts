import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../respositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../respositories/in-memory/UsersTokenRepositoryInMemory";
import { IUsersRepository } from "../../respositories/IUsersRepository";
import { IUsersTokensRepository } from "../../respositories/IUsersTokensRepository";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPAsswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: IUsersRepository;
let userTokensRepositoryInMemory: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProviderInMemory: IMailProvider;

describe("Send Forgot Password Mail", () => {
  beforeAll(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPAsswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await userRepositoryInMemory.create({
      email: "test@test.com",
      name: "testUser",
      password: "testPassword",
      driver_license: "45678964",
    });

    await sendForgotPAsswordMailUseCase.execute("test@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send email to a non existent user", async () => {
    await expect(
      sendForgotPAsswordMailUseCase.execute("test2@test.com")
    ).rejects.toEqual(new AppError("There is no user for these email!"));
  });

  it("should be able to create an users token", async () => {
    const generatedTokenMail = jest.spyOn(
      userTokensRepositoryInMemory,
      "create"
    );
    await userRepositoryInMemory.create({
      email: "test3@test.com",
      name: "testUser",
      password: "testPassword",
      driver_license: "45678964",
    });

    await sendForgotPAsswordMailUseCase.execute("test3@test.com");

    expect(generatedTokenMail).toHaveBeenCalled();
  });
});
