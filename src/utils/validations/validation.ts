import Joi from "joi";
import { IAuthor, user, login, IBooks } from "../interfaces";

export const validateEntry = (data: IAuthor) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    age: Joi.number().required(),
    address: Joi.string().required(),
    books: Joi.array().required(),
  }).unknown();
  return schema.validate(data);
};

export const validateUser = (user: user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    DOB: Joi.date().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.number().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(user);
};

export const validateLogin = (person: login) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(person);
};

export const validateBook = (data: IBooks) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    isPublished: Joi.boolean().required(),
    datePublished: Joi.date().required(),
    serialNumber: Joi.number().required(),
  });
  return schema.validate(data);
};

export const validateBookUpdate = (data: IBooks) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40),
    isPublished: Joi.boolean(),
    datePublished: Joi.date(),
    serialNumber: Joi.number(),
  });
  return schema.validate(data);
};

export const validateAuthor = (data: IAuthor) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    age: Joi.number().required(),
    address: Joi.string().required(),
  });
  return schema.validate(data);
};

export const validateAuthorUpdate = (data: IAuthor) => {
  const schema = Joi.object({
    author: Joi.string(),
    age: Joi.number(),
    address: Joi.string(),
  });
  return schema.validate(data);
};
