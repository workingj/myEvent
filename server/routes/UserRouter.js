import { Router } from "express";
import * as userController from '../Controller/UserController.js'

const userRouter = Router();

userRouter.route('/')
    .post(userController.createUser);
    
userRouter.route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser);


export default userRouter;