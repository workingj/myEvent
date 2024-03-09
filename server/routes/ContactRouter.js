import { Router } from 'express';
import * as contactController from '../Controller/ContactController.js'

const contactRouter = Router();

contactRouter.route('/')
    .post(contactController.createContact)
// .get(contactController.getAllContactsForUser)

contactRouter.route('/allforuser')
    .post(contactController.getAllContactsForUser);
contactRouter.route('/deleteallforuser')
    .delete(contactController.deleteAllContactsForUser);


contactRouter.route('/:id')
    .get(contactController.getContact)
    .delete(contactController.deleteContact)
    .put(contactController.updateContact);

contactRouter.route('/test/')
    .post(contactController.createContact)
// .get(contactController.getAllContactsForUser)


export default contactRouter;