import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUserUseCase/CreateUser.Controller";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", updateUserAvatarController.handle);

export { usersRoutes };
