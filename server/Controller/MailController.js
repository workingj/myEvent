import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Contact from '../models/ContactModel.js';
import User from '../models/UserModel.js';
import Event from '../models/EventModel.js';
import { sendMail, sendGreeting, sendNotification } from "../services/mail.js";

export const processEvents = asyncHandler(async (req, res, next) => {
    console.log("PROCESS EVENTS @", Date.now());

    const events = await Event.find();
    if (!events) throw new ErrorResponse(`Contacts do not exist`, 404);
    console.log("events:", events.length);

    let responseData = [];

    events.length && events.map((event) => {
        if (event.active) {
            const date = event.actionDate.toISOString().slice(0, 10).split('-');
            const time = (event.time + ":00").split(':');
            // console.log(date);
            // console.log(time);

            let now = new Date();
            const act = new Date(Date.UTC(Number.parseInt(date[0]), Number.parseInt(date[1]), Number.parseInt(date[2]), Number.parseInt(time[0]), Number.parseInt(time[1]), Number.parseInt(time[2])));
            console.log("now", now.valueOf(), now);
            console.log("act", act.valueOf(), act);

            now.valueOf() > act.valueOf() && console.log("now > act: ", now.valueOf() > act.valueOf(), "TRIGGER" + event.title);
            now.valueOf() < act.valueOf() && console.log("now < act: ", now.valueOf() > act.valueOf());

            console.log(now.valueOf() - act.valueOf(), event.title);

            if (now.valueOf >= act.valueOf) {
                let Mail = {
                    eventTitle: "",
                    subject: "",
                    html: "",
                    contactMail: "",
                    contactName: "",
                    userMail: "",
                    userName: ""
                };
                Mail.subject = event.title;
                Mail.html = event.text;
                // console.log("FIRE ACTION:", event.text);
                // console.log("event.contact:", event.contact);
                // console.log("event.user:   ", event.user);
                // console.log(event.contact.valueOf());


                getContact(event.contact.valueOf()).then((contact) => {
                    console.log("user", contact.email, contact.firstName + contact.lastName);
                    try {
                        Mail.contactMail = contact.email;
                        Mail.contactName = contact.firstName + " " + contact.lastName;
                    } catch (error) {
                        console.error("contact", contact.firstName, " ", contact.lastName);
                    }

                    getUser(event.user.valueOf()).then((user) => {
                        console.log("user", user.email, user.firstName + user.lastName);
                        try {
                            Mail.userMail = user.email;
                            Mail.userName = user.firstName + " " + user.lastName;
                        } catch (error) {
                            console.error("user", user.firstName, " ", user.lastName);
                        }

                        // Send Greeting to Cantact
                        sendGreeting(Mail).then((mres) => {
                            responseData.push(mres);
                        }).catch(err => console.error("ERROR: in MailController catch sendGreeting", err));

                        // Send User Notification
                        sendNotification(Mail).then((mres) => {
                            responseData.push(mres);
                        }).catch(err => console.error("ERROR: in MailController catch sendNotification", err));

                        // Set the event active status to false
                        closeEvent(event).then((mres) => {
                            responseData.push(mres);
                        }).catch(err => console.error("ERROR: in MailController catch closeEvent", err));

                    }).catch(err => console.error("ERROR: in MailController catch getUser", err));

                }).catch(err => console.error("ERROR: in MailController catch getContact", err));
            }
        }
    });

    setTimeout(() => {
        events.length && res.status(201).json(responseData)
        console.log(`PROCESS EVENTS RESULT: ${responseData.length / 2} User-Events have been processed!`);
    }
        , 6000);

    // const subject = `MyEvents: Firstname Lastname Greets You!`
    // const htmlText = `<h1>Test Mail</h1><p>From <b>MyEvent</b> NodeJs Server!</p>`;

    // sendMail(mailJoe, subject, htmlText).then((mres) => {
    //     data.push(mres);
    //     sendMail(mailFar, subject, htmlText).then((mres) => {
    //         data.push(mres);
    //         // res.status(201).json(mres);
    //         sendMail(mailIss, subject, htmlText).then((mres) => {
    //             data.push(mres);
    //             // res.status(201).json(mres);
    //             res.status(201).json(data);
    //         });
    //         // res.status(201).json(mres);
    //     });
    //     // res.status(201).json(mres);
    // });
});

async function getContact(id) {
    // console.log("getContact", id);
    return new Promise((resolve, reject) => {
        resolve(Contact.findById(id));
        reject("Error: getCont");
    })

}
async function getUser(id) {
    // console.log("getUser", id);
    return new Promise((resolve, reject) => {
        resolve(User.findById(id));
        reject("Error: getUser");
    })
}
async function closeEvent(event) {
    // console.log("getUser", id);
    event.active = false;

    return new Promise((resolve, reject) => {

        resolve(Event.findByIdAndUpdate(event.id, event, { new: true, runValidators: true, }));
        reject("Error: getUser");
    })
}