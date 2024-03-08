import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

import sendMail from "../services/mail.js";
import Contact from '../models/ContactModel.js';
import User from '../models/UserModel.js';
import Event from '../models/EventModel.js';



export const testMail = asyncHandler(async (req, res, next) => {
    const body = req.body;
    console.log("mailrouter", body);


    const contacts = await Contact.find();
    const users = await User.find();
    const events = await Event.find();
    console.log("contacts:", contacts.length);
    console.log("users:", users.length);
    console.log("events:", events.length);
    if (!contacts) throw new ErrorResponse(`Contacts do not exist`, 404);


    const mailJoe = `workingj@pm.me`
    const mailFar = `f.karamizadeh@gmail.com`
    const mailIss = `issa.alali.991@gmail.com`

    const subject = `MyEvents: Firstname Lastname Greets You!`
    const htmlText = `<h1>Test Mail</h1><p>From <b>MyEvent</b> NodeJs Server!</p>`;


    let data = [];
    data = sendMail(mailJoe, subject, htmlText);
    // data.push(sendMail(mailFar, subject, htmlText))
    // data.push(sendMail(mailIss, subject, htmlText))

    console.log("id:",data.id);
    console.log("message:",data.message);

    res.status(201).json(data);
});
