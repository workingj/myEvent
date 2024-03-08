import { Router } from 'express';
import * as mailController from '../Controller/MailController.js'

const mailRouter = Router();

mailRouter.route('/')
    .get(mailController.testMail)

export default mailRouter;