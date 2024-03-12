import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Contact from '../models/ContactModel.js';


export const createContact = asyncHandler(async (req, res, next) => {
    const {wm, email, user, dates, street, city, zipcode, lastName, firstName } = req.body;

    const contact = await Contact.create({
      
        email,
        user,
        dates,
        street,
        city,
        zipcode,
        lastName,
        firstName,
    });

    res.status(201).json({
        success: true,
        data: contact,
    });
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



// @desc    del all contacts for user

export const deleteAllContactsForUser = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    const { user } = req.body

    const contact = await Contact.deleteMany({ user });
    if (!contact) throw new ErrorResponse(`Contacts not found`, 404);

    res.status(200).json({ success: true, data: {} });
}

);

//  upload Image to Cloudinary by contact id
 export const uploadImage = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findByIdAndUpdate( req.params.id, { image: req.file.path });
    console.log('file: '+req.file.path);
    if (!contact) throw new ErrorResponse(`User ${req.params.id} does not exist`, 404);
    res.json(contact.image);

}
);


