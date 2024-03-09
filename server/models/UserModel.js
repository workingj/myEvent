import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
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
    birthDate: {
        type: Date,
    },
    avatar: {
        type: String,
        default: "defaultAvatar.svg"
    },
    role: {
        type: String,
        default: "user",
        trim: true,
    },
    balance: {
        type: String,
        default: '0',
    },
});

export default mongoose.model('User', userSchema);