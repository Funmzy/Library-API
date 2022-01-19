import express from "express";

import {
  createAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controller/authorController";

import { protectRoute } from "../controller/auth";

import validateMiddleware from "../middleware/validateMiddleware";

import {
  validateAuthor,
  validateAuthorUpdate,
} from "../utils/validations/validation";

const router = express.Router();

router.post(
  "/",
  protectRoute,
  [validateMiddleware(validateAuthor)],
  createAuthor
);

router.get("/", protectRoute, getAllAuthors);

router.get("/:id", protectRoute, getAuthor);

router.put(
  "/:id",
  protectRoute,
  [validateMiddleware(validateAuthorUpdate)],
  updateAuthor
);

router.delete("/:id", protectRoute, deleteAuthor);

export default router;
