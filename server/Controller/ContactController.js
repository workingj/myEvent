import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Contact from '../models/ContactModel.js';


export const createContact = asyncHandler(async (req, res, next) => {
    const newContact = await Contact.create(req.body);

    if (!newContact) throw new ErrorResponse(`Contact ${req.body.contactname} could not be created`, 422);

    res.status(201).json(newContact);
});

export const getContact = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const contact = await Contact.findById(id);
    if (!contact) throw new ErrorResponse(`Contact ${id} does not exist`, 404);

    res.send(contact);
});

export const getAllContacts = asyncHandler(async (req, res, next) => {

    const contacts = await Contact.find();
    if (!contacts) throw new ErrorResponse(`Contacts do not exist`, 404);

    res.send(contacts);
});
// ------------------ get all contacct for one User---------------------

export const getAllContactsForUser = asyncHandler(async (req, res, next) => {
    const { user } = req.body
    const contacts = await Contact.find
        ({ user: user });
    if (!contacts) throw new ErrorResponse(`No contacts found`, 404);

    res.status(200).json({ success: true, data: contacts });

});


export const updateContact = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { id },
    } = req;

    const found = await Contact.findById(id);
    if (!found) throw new ErrorResponse(`Contact ${id} does not exist`, 404);
    const updatedPost = await Contact.findByIdAndUpdate(id, body, {
        new: true,
    });

    res.json(updatedPost);
});

export const deleteContact = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { id },
    } = req;

    const found = await Contact.findById(id);
    if (!found) throw new ErrorResponse(`Contact ${id} does not exist`, 404);

    await Contact.findByIdAndDelete(id);
    res.json({ success: `Contact ${id} was deleted` });
});