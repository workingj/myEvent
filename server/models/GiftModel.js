import mongoose from 'mongoose';

const GiftModel = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'URL is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});

export default mongoose.model('Gift', GiftModel);

