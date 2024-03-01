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
    unique: true,
  },
  templatenumber: {
    type: Number,
    required: [true, "Template Number is required"],
    unique: true,
  },
  images: {
    type: String,
    requires: [true, "Image is required"],
  },
});

export default mongoose.model("AdminTemplates", templateSchema);
