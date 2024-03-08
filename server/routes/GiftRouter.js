import { Router } from "express";
import * as giftController from '../Controller/GiftController.js';

import upload from '../services/Uploade.js';


const giftRouter = Router();

giftRouter.route('/').get(giftController.getAllImages);
giftRouter.route('/:id').get(giftController.getImage);
giftRouter.route("/upload").post(upload.single("image"), giftController.uploadImage);

export default giftRouter;