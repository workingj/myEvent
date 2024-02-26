import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
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
    address: {
        type: Map,
        of: String,
    }
})