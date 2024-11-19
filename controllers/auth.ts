const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
import User from "../models/user";
require("dotenv").config();
import crypto from "crypto";
import { Request, Response } from "express";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
    if (user.status == "incomplete signup") {
      return res.json({ message: "user sign up not completed" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });
    res.json({ success: true, token, user });
    console.log(user._id);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  function generateSignupToken() {
    return Math.floor(
      100000 + (crypto.randomBytes(3).readUIntBE(0, 3) % 900000)
    ).toString();
  }
  let signupToken = generateSignupToken();

  const { fullname, username, email, password, phone } = req.body;

  if (!username || !password || !fullname || !email || !phone) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const existingEmail = await User.findOne({ email });
    const existingUser = await User.findOne({ username });

    if (existingEmail) {
      return res.json({ success: false, message: "Email already exists" });
    }
    if (existingUser) {
      return res.json({ success: false, message: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      fullname,
      username,
      email : email.toLowerCase(),
      phone,
      password: hashedPassword,
      token: signupToken,
      tokenExpires: new Date(Date.now() + 5 * 60 * 1000),
      status: "incomplete signup",
    });

    const signupURL = `${process.env.CLIENT_URL}/signup?token=${signupToken}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Sign Up Request",
      // text: `You are receiving this email because you have requested a password reset for your account.\n\n
      //        Please click on the following link, or paste it into your browser, to complete the process:\n\n
      //        ${resetURL}\n\n
      //        If you did not request this, please ignore this email and your password will remain unchanged.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px;">
          <h2>Sign Up Request</h2>
          <p>You are receiving this email to complete your signup process at plusworld academy.</p>
          <p>
            <a href="${signupURL}" style="background-color: #ffaa00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Complete Signup</a>
          </p>
          <p>Or copy and paste this link into your browser: <a href="${signupURL}">${signupURL}</a></p>
          <p><strong>Thank you!</strong></p>
          <img src="cid:logoImage" alt="Company Logo" width="100" height:auto;>
        </div>
      `,
      // attachments: [
      //   {
      //     filename: "logo.png",
      //     path: "../assets/logo.png",
      //     cid: "logoImage",
      //   },
      // ],
    };
    await newUser.save().then(await transporter.sendMail(mailOptions));
    return res.json({
      success: true,
      message: "Email sent, signup incomplete",
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return res.json({ success: false, message: "Internal server error" });
  }
};

export const completeSignup = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      token: token,
      tokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }
    user.status = "completed";
    await user.save();
    res.status(200).json({ message: "signup completed." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  function generateResetToken() {
    return Math.floor(
      100000 + (crypto.randomBytes(3).readUIntBE(0, 3) % 900000)
    ).toString();
  }
  let resetToken = generateResetToken();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with that email address." });
    }

    //   const resetToken = crypto.randomBytes(20).toString('hex');
    generateResetToken();

    let existingUser = await User.findOne({ resetPasswordToken: resetToken });

    while (existingUser) {
      resetToken = generateResetToken();
      existingUser = await User.findOne({ resetPasswordToken: resetToken });
    }

    user.token = resetToken;
    user.tokenExpires = new Date(Date.now() + 20 * 60 * 60 * 1000); // Token expires in 5 minutes

    await user.save();

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
      // attachments: [
      //   {
      //     filename: "logo.png",
      //     path: "../assets/logo.png",
      //     cid: "logoImage",
      //   },
      // ],
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email address." });
  } catch (error) {
    console.error("this is", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      token: token,
      tokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    user.password = hashedPassword;
    user.token = undefined;
    user.tokenExpires = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Password has been successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    return res.json({ success: true });
  } catch (error) {
    return error;
  }
};
