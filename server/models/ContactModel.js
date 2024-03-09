import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
    name: String, date: Date
});

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
       
        required: [true, 'Email is required'],
    },
    firstName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
    },
    zipcode: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    street: {
        type: String,
        trim: true,
    },
    dates: [{ title: String, value: Date }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

export default mongoose.model('Contact', contactSchema);