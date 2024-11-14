"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth_1 = require("../controllers/auth");
router.route("/login").post(auth_1.login);
router.route("/signup").post(auth_1.signUp);
router.route("/forgot-password").post(auth_1.forgotPassword);
router.route("/reset-password").post(auth_1.resetPassword);
module.exports = router;