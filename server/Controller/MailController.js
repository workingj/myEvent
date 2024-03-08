import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

import sendMail from "../services/mail.js";
import Contact from '../models/ContactModel.js';
import User from '../models/UserModel.js';
import Event from '../models/EventModel.js';
import { log } from 'console';



export const testMail = asyncHandler(async (req, res, next) => {
    const body = req.body;
    console.log("mailrouter", body);


    const contacts = await Contact.find();
    const users = await User.find();
    const events = await Event.find();
    console.log("contacts:", contacts.length);
    console.log("users:", users.length);
    console.log("events:", events.length);
    events.map((event) => {
        console.log(event.contact);
    });
    if (!contacts) throw new ErrorResponse(`Contacts do not exist`, 404);


    const mailJoe = `workingj@pm.me`
    const mailFar = `f.karamizadeh@gmail.com`
    const mailIss = `issa.alali.991@gmail.com`

    const subject = `MyEvents: Firstname Lastname Greets You!`
    const htmlText = `<h1>Test Mail</h1><p>From <b>MyEvent</b> NodeJs Server!</p>`;


    let data = [];
    sendMail(mailJoe, subject, htmlText).then((mres) => {
        // res.status(201).json(mres);
        data.push(mres);
        sendMail(mailFar, subject, htmlText).then((mres) => {
            data.push(mres);
            // res.status(201).json(mres);
        });
        sendMail(mailIss, subject, htmlText).then((mres) => {
            data.push(mres);
            // res.status(201).json(mres);
            res.status(201).json(data);
        });
    });
});
