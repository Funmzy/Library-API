import mongoose from "mongoose";
import validator from "validator";

//import { model, Schema} from 'mongoose'
//you can just make it ....new Schma and model()

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
    },

    DOB: {
      type: Date,
      required: [true, "Please provide your date of birth"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },

    phoneNo: {
      type: Number,
      required: [true, "Please provide your phone number"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please provide password"],
    },

    isAdmin: {
      type: String,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
