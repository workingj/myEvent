import { Router } from 'express';
import * as registerController from '../Controller/RegisterController.js';
const registerRouter = Router();

// ROUTES

registerRouter.route('/').post(registerController.register);

export default registerRouter;

// --------------register user -----------
// localhost:8000/register
// JSON in Postman:
// {
//   "username": "issa",
//    "password": "12345",
//   "email": "issa@gmail.com",
//   "firstName":"Issa",
//   "lastName":"Alali",
//    "birthDate": "01/01/1991"
     
// }