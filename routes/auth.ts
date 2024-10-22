const express = require("express");
const router = express.Router();
import User from "../models/user"

require("dotenv").config();

import {
  forgotPassword,
  resetPassword,
  signUp,
  login,
  completeSignup,
  remove,
} from "../controllers/auth";


router.route("/login").post(login);

router.route("/signup").post(signUp);

router.route("/complete-signup").post(completeSignup);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password").post(resetPassword);

router.route("/deleteUser").delete(remove)

module.exports = router;
