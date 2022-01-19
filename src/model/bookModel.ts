import mongoose from "mongoose";
import { IBooks } from "../utils/interfaces";
import Author from "../model/authorModel";

const bookSchema = new mongoose.Schema(
  {
    ID: String,
    authorId: String,
    name: {
      type: String,
    },

    isPublished: {
      type: Boolean,
    },

    datePublished: {
      type: Date,
    },

    serialNumber: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

bookSchema.pre<IBooks>("save", async function (next) {
  const author = await Author.findOne({ ID: this.authorId });

  if (process.env.NODE_ENV !== "test") {
    if (!author) {
      throw new Error(`author with does not exist`);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default mongoose.model<IBooks>("Book", bookSchema);
