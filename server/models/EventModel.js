import mongoose from 'mongoose';

const EventModel = new mongoose.Schema({
  actionDate: {
    type: Date,
    required: [true, 'Action Date is required'],
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  image: {
    type: String,
    default: 'defaultImage.png',
  },
  active: {
    type: Boolean, 
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  },
  time: {
    type: String,
 
  },
});

export default mongoose.model('Event', EventModel);

