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
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const courses_1 = __importDefault(require("./models/courses"));
const userProgress_1 = __importDefault(require("./models/userProgress"));
const verifyToken_1 = __importDefault(require("./verifyToken"));
const nodemailer = require('nodemailer');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const paymentRouter = require('./routes/payments');
const authRouter = require("./routes/auth");
const port = 4000;
const dburl = process.env.dburl || '';
const corsOption = {
    origin: ['http://localhost:5173', 'https://plusworld-fe.vercel.app', 'http://localhost:3000', 'https://plusworld.vercel.app'],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use('/api/user', verifyToken_1.default, userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/auth', authRouter);
app.use('/api', paymentRouter);
function connectToMongo(dburl) {
    return __awaiter(this, void 0, void 0, function* () {
        const retryAttempts = 3;
        const connectTimeoutMS = 20000;
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
            try {
                yield mongoose.connect(dburl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    connectTimeoutMS,
                });
                console.log('Connected to Database');
                return;
            }
            catch (error) {
                console.error(`Connection attempt ${attempt} failed:`, error.message);
                yield new Promise((resolve) => setTimeout(resolve, Math.min(attempt * 2000, 10000)));
            }
        }
        throw new Error('Failed to connect to MongoDB Atlas after retries');
    });
}
connectToMongo(dburl)
    .then(() => {
    console.log('connection succesful');
})
    .catch((error) => {
    console.error('Fatal error:', error.message);
});
app.get('/', (req, res) => {
    res.send('Dandys Server');
});
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (typeof searchTerm !== 'string' || searchTerm.trim() === '') {
        return res.status(400).json({ error: 'Invalid search term' });
    }
    try {
        console.log(`this is ${searchTerm}`);
        const searchOptions = {
            $or: [
                { courseName: { $regex: searchTerm, $options: 'i' } },
                { courseTitle: { $regex: searchTerm, $options: 'i' } },
                { tutors: { $regex: searchTerm, $options: 'i' } },
                { courseCategory: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
            ],
        };
        const result = yield courses_1.default.find(searchOptions);
        if (result.length === 0) {
            return res.status(404).json({ error: 'No courses found matching your search.' });
        }
        res.json({ result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving your search results' });
    }
}));
app.post('/api/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password',
        },
    });
    // Define email options
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'recipient_email@example.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
app.post('/api/start-course', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.body;
    try {
        const progress = new userProgress_1.default({
            userId,
            courseId,
            startTime: new Date(),
            sectionsCompleted: 0,
            status: 'in progress',
        });
        yield progress.save();
        res.json(progress);
    }
    catch (error) {
        res.status(500).json({ error: 'Error starting course' });
    }
}));
app.post('/api/complete-course', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.body;
    try {
        const progress = yield userProgress_1.default.findOne({ userId, courseId });
        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        }
        progress.status = 'finished';
        progress.sectionsCompleted = 100;
        yield progress.save();
        res.json(progress);
    }
    catch (error) {
        res.status(500).json({ error: 'Error completing course' });
    }
}));
function monitorMemory() {
    const memoryUsage = process.memoryUsage();
    console.log(`Memory Usage: ${memoryUsage.heapUsed / 1024 / 1024} MB`);
}
setInterval(monitorMemory, 5000); // Check every 5 secondscd
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
