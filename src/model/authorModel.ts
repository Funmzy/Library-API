import mongoose from "mongoose";
import { IAuthor } from "../utils/interfaces";

const authorSchema = new mongoose.Schema(
  {
    ID: String,
    author: {
      type: String,
      required: [true, "Please provide your name"],
    },
    age: {
      type: Number,
      required: [true, "Please provide your age"],
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAuthor>("Author", authorSchema);
