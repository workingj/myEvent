import mongoose from "mongoose";

export const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    default: "admin",
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    
  },
  images: {
    type: String,
  },
});

export default mongoose.model("AdminTemplates", templateSchema);
