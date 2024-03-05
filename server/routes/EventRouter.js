import { Router } from 'express';
import * as eventController from '../Controller/EventController.js';
const eventRouter = Router();

// ROUTES

eventRouter.route('/')
    .post(eventController.getEvents)
    .post(eventController.createEvent);
 eventRouter.route('/create')
    .post(eventController.createEvent);

eventRouter.route('/:id')
    .get(eventController.getEvent)
    .put(eventController.updateEvent)
    .delete(eventController.deleteEvent);




export default eventRouter;


//  --------------create event -----------
// localhost:8000/events

// JSON in Postman:
// {
//   "actionDate":"2021-09-01",
//   "title":"Title",
//   "text":"Text",
//   "image":"Image",
//   "eventNR":1,
//   "user":"65dc93f865137995cc7ea9a5"
// }


// --------------update event -----------
// localhost:8000/events/65dc9708f9cfadf14f6ee5ae
// JSON in Postman for PUT: 
// {
//   "text":"Text",
// }
