import express, { Request, Response, NextFunction } from "express";
import { protectRoute, checkAdmin } from "../controller/auth";

var router = express.Router();

/* GET home page. */
router.get(
  "/",
  protectRoute,
  checkAdmin,
  function (req: Request, res: Response, _next: NextFunction) {
    console.log(req.user);

    res.json({ message: "Incoming!" });
  }
);

export default router;
