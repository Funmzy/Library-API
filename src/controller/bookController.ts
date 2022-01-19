import { Request, Response } from "express";
import Book from "../model/bookModel";
import APIFeatures from "../utils/apiFeatures";

export const getAnAuthorBooks = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(
      Book.find({ authorId: req.params.authorId }),
      req.query
    )
      .limitFields()
      .paginate();
    const book = await features.query;
    const total = await Book.countDocuments();
    let page = parseInt(req.query.page as string);
    let limit = parseInt(req.query.limit as string);
    let noOfPages = Math.ceil(total / limit);
    let previous = page === 1 || page > noOfPages ? null : page - 1;
    let next = page >= noOfPages ? null : page + 1;
    res.status(200).json({
      message: "successful!",
      previous: previous,
      next: next,
      book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(400).json({
        message: `book with the id ${req.params.id} does not exist`,
      });
    }
    res.status(200).json({
      message: "successful!",
      book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const lastBook = await Book.find().sort({ _id: -1 }).limit(1);

    let generate;
    if (lastBook.length === 0) {
      generate = "book1";
    } else {
      generate = `book${parseInt(lastBook[0].ID.split("k")[1]) + 1}`;
    }
    const book = await Book.create({
      ID: generate,
      authorId: req.params.id,
      datePublished: new Date().getTime(),
      ...req.body,
    });
    res.status(200).json({ message: "successful!", book });
  } catch (err: any) {
    if (err.message === "author with does not exist") {
      return res.status(400).json({
        status: "failed",
        message: `author with the id ${req.params.id} does not exist`,
      });
    }
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!book) {
      throw new Error(`No book with id : ${req.params.id}`);
    }

    res.status(200).json({ message: "successful!", book });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });

    if (!book) {
      throw new Error(`No product with id : ${req.params.id}`);
    }

    await Book.remove();
    res.status(200).json({ message: "successful!" });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};
