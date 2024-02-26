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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dates: {
        type: Map,
        of: Date,
    }
})

export default mongoose.model('Contact', contactSchema);