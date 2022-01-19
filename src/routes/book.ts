import express from "express";

import {
  getAnAuthorBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controller/bookController";

import { protectRoute } from "../controller/auth";

import validateMiddleware from "../middleware/validateMiddleware";

import {
  validateBook,
  validateBookUpdate,
} from "../utils/validations/validation";

const router = express.Router();

router.post(
  "/:id",
  protectRoute,
  [validateMiddleware(validateBook)],
  createBook
);

router.get("/author/:authorId", protectRoute, getAnAuthorBooks);

router.get("/:id", protectRoute, getBook);

router.put(
  "/:id",
  protectRoute,
  [validateMiddleware(validateBookUpdate)],
  updateBook
);

router.delete("/:id", protectRoute, deleteBook);

export default router;
