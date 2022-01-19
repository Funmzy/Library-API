import { Request, Response } from "express";
import Author from "../model/authorModel";
import APIFeatures from "../utils/apiFeatures";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(Author.find(), req.query)
      .limitFields()
      .paginate();
    const author = await features.query;
    const total = await Author.countDocuments();
    let page = parseInt(req.query.page as string);
    let limit = parseInt(req.query.limit as string);
    let noOfPages = Math.ceil(total / limit);
    let previous = page === 1 || page > noOfPages ? null : page - 1;
    let next = page >= noOfPages ? null : page + 1;

    res.status(200).json({
      status: "successful!",
      //results: total,
      //page: `${page}`,
      previous: previous,
      next: next,
      //size: author.length,
      author,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });

    if (!author) {
      return res.status(400).json({
        message: `author with the id ${req.params.id} does not exist`,
      });
    }
    res.status(200).json({
      message: "successful!",
      author,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const lastAuthor = await Author.find().sort({ _id: -1 }).limit(1);

    let generate;
    if (lastAuthor.length === 0) {
      generate = "author1";
    } else {
      generate = `author${parseInt(lastAuthor[0].ID.split("r")[1]) + 1}`;
    }

    const newData = { ID: generate, ...req.body };
    const author = await Author.create(newData);
    res.status(201).json({ message: "successful!", author });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ message: "successful!", author });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findOneAndDelete({ _id: req.params.id });

    if (!author) {
      throw new Error(`No product with id : ${req.params.id}`);
    }

    await author.deleteOne();
    res.status(200).json({ message: "successful!" });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
  }
};
