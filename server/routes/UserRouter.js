import { Router } from "express";
import * as userController from '../Controller/UserController.js';
import verifyToken from "../middelwares/verifyToken.js";
import upload from '../services/Uploade.js';

const userRouter = Router();

userRouter.route('/register').post(userController.createUser);

userRouter.route('/:id')
    // .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser);


//Login and verify
userRouter.route('/login')
    .post(userController.login);

userRouter
    .get("/profile", verifyToken, userController.getUser);
// change Passweord
userRouter.put("/changepassword/:id", userController.changePassword);
    


//Logout

userRouter.post("/logout", verifyToken, userController.logout);

//Upload image
userRouter.post("/upload", verifyToken, upload.single("image"), userController.uploadImage);
userRouter.get("/image/:id", userController.getImage);

export default userRouter;