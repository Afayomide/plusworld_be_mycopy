"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.signUp = exports.login = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const user_1 = __importDefault(require("../models/user"));
require("dotenv").config();
const crypto_1 = __importDefault(require("crypto"));
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "4d",
        });
        res.json({ success: true, token, user });
        console.log(user._id);
    }
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password, phone } = req.body;
    if (!username || !password || !fullname || !email || !phone) {
        return res.json({ success: false, message: "All fields are required" });
    }
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: "Username already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = new user_1.default({
            fullname,
            username,
            email,
            phone,
            password: hashedPassword,
        });
        yield newUser.save();
        return res.json({ success: true });
    }
    catch (error) {
        console.error("Error:", error.message);
        return res.json({ success: false, message: "Internal server error" });
    }
});
exports.signUp = signUp;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    function generateResetToken() {
        return Math.floor(100000 + (crypto_1.default.randomBytes(3).readUIntBE(0, 3) % 900000)).toString();
    }
    let resetToken = generateResetToken();
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "No account found with that email address." });
        }
        //   const resetToken = crypto.randomBytes(20).toString('hex');
        generateResetToken();
        let existingUser = yield user_1.default.findOne({ resetPasswordToken: resetToken });
        while (existingUser) {
            resetToken = generateResetToken();
            existingUser = yield user_1.default.findOne({ resetPasswordToken: resetToken });
        }
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // Token expires in 5 minutes
        yield user.save();
        // Send reset email
        const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: "Password Reset Request",
            // text: `You are receiving this email because you have requested a password reset for your account.\n\n
            //        Please click on the following link, or paste it into your browser, to complete the process:\n\n
            //        ${resetURL}\n\n
            //        If you did not request this, please ignore this email and your password will remain unchanged.`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You are receiving this email because you have requested a password reset for your account.</p>
          <p>
            <a href="${resetURL}" style="background-color: #ffaa00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset your password</a>
          </p>
          <p>Or copy and paste this link into your browser: <a href="${resetURL}">${resetURL}</a></p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p><strong>Thank you!</strong></p>
          <img src="cid:logoImage" alt="Company Logo" width="100" height:auto;>
        </div>
      `,
            attachments: [
                {
                    filename: "logo.png",
                    path: "./assets/logo.png",
                    cid: "logoImage",
                },
            ],
        };
        yield transporter.sendMail(mailOptions);
        res
            .status(200)
            .json({ message: "Password reset link sent to your email address." });
    }
    catch (error) {
        console.error("this is", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    console.log(req.body);
    try {
        const user = yield user_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Password reset token is invalid or has expired." });
        }
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        yield user.save();
        res
            .status(200)
            .json({ message: "Password has been successfully updated." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.resetPassword = resetPassword;
