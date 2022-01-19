import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { connectDB, connectTestDB } from "./db/connect";
import dotenv from "dotenv";
import cors from "cors";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authorsRouter from "./routes/authors";
import bookRouter from "./routes/book";

dotenv.config();

const app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  connectTestDB();
} else {
  //connect db
  connectDB();
}

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/author", authorsRouter);
app.use("/book", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const start = async () => {
//   try {
//     await connectDB(process.env.DATABASE as string);
//     console.log("Connecected to DB");
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

export default app;
