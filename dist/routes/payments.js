"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const payments_1 = require("../controllers/payments");
const verifyToken_1 = __importDefault(require("../verifyToken"));
router.post("/pay").post(verifyToken_1.default, payments_1.pay);
router.route("/verify/:reference").get(verifyToken_1.default, payments_1.verify);
router.route("/remove").get(payments_1.remove);
module.exports = router;
