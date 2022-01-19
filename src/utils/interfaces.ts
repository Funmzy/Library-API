import mongoose from "mongoose";

export interface IAuthor extends mongoose.Document {
  ID: string;
  author: string;
  age: number;
  address: string;
}

export interface IBooks extends mongoose.Document {
  ID: string;
  name: string;
  isPublished: boolean;
  datePublished: Date | null;
  serialNumber: string;
  authorId: string;
}

export interface sign {
  fullname: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  isAdmin: boolean;
}

export interface login {
  email: string;
  password: string;
}

export interface isAdmin {
  isAdmin: boolean;
}

export interface user {
  firstName: string;
  lastName: string;
  DOB: Date;
  email: string;
  phoneNo: number;
  password: string;
  isAdmin: boolean;
}
