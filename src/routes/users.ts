import express from "express";
import { logins, signup, updateUserAuth } from "../controller/auth";
import validateMiddleware from "../middleware/validateMiddleware";
import { validateUser, validateLogin } from "../utils/validations/validation";

var router = express.Router();

/* GET users listing. */
router.post("/signup", [validateMiddleware(validateUser)], signup);
router.post("/login", [validateMiddleware(validateLogin)], logins);
router.put("/:id", updateUserAuth);

export default router;
