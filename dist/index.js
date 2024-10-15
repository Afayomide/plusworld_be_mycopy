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
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const user_1 = __importDefault(require("./models/user"));
const courses_1 = __importDefault(require("./models/courses"));
const nodemailer = require("nodemailer");
const port = 4000;
const dburl = process.env.dburl || "";
const corsOption = {
    origin: ['http://localhost:5173', 'https://plusworld-fe.vercel.app']
};
app.use(cors(corsOption));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
function connectToMongo(dburl) {
    return __awaiter(this, void 0, void 0, function* () {
        const retryAttempts = 3;
        const connectTimeoutMS = 20000;
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
            try {
                yield mongoose.connect(dburl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    connectTimeoutMS
                });
                console.log('Connected to Database');
                return;
            }
            catch (error) {
                console.error(`Connection attempt ${attempt} failed:`, error.message);
                yield new Promise(resolve => setTimeout(resolve, Math.min(attempt * 2000, 10000)));
            }
        }
        throw new Error('Failed to connect to MongoDB Atlas after retries');
    });
}
connectToMongo(dburl)
    .then(() => {
    console.log("connection succesful");
})
    .catch(error => {
    console.error('Fatal error:', error.message);
});
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            console.warn('JWT has expired!');
            return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
        }
        else {
        }
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
app.get('/', (req, res) => {
    res.send("Dandys Server");
});
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.json({ success: false, message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4d' });
        res.json({ success: true, token });
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}));
app.post('/api/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password } = req.body;
    if (!username || !password || !fullname || !email) {
        res.json({ success: false, message: 'All Fields are required' });
    }
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: 'Username already exists' });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const customer = new user_1.default({
            fullname,
            username,
            email,
            password: hashedPassword,
        });
        yield customer.save();
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error:', error.message);
        res.json({ success: false, message: 'Internal server error' });
    }
}));
app.post('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.body;
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    try {
        console.log(`this is ${searchTerm}`);
        const searchOptions = {
            $or: [
                { courseName: { $regex: searchTerm, $options: 'i' } },
                { courseTitle: { $regex: searchTerm, $options: 'i' } },
                { tutorName: { $regex: searchTerm, $options: 'i' } },
                { courseCategory: { $regex: searchTerm, $options: 'i' } },
                // { price: { $regex: searchTerm, $options: 'i' } },
                // {duration: {$regex: searchTerm, $options: "i"}},
                { description: { $regex: searchTerm, $options: "i" } }
            ],
        };
        const result = yield courses_1.default.find(searchOptions);
        res.json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving products' });
    }
}));
app.put("/api/user", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    const { username, fullname, email, interests, location } = req.body;
    try {
        // Construct update data object with the fields to be updated
        const updateData = {};
        if (fullname)
            updateData.fullname = fullname;
        if (username)
            updateData.username = username;
        if (email)
            updateData.email = email;
        if (interests)
            updateData.interests = interests;
        if (location)
            updateData.location = location;
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}));
app.post('/submit-form', (req, res) => {
    // Extract form data from the request
    const { name, email, message } = req.body;
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password'
        }
    });
    // Define email options
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'recipient_email@example.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
