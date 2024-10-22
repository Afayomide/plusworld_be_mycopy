"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false, unique: true },
    hobbies: { type: String, required: false },
    dob: { type: Date, required: false },
    password: { type: String, required: true },
    location: { type: String, required: false },
    language: { type: String, required: false },
    goal: { type: String, required: false },
    cart: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    profileCompleted: { type: Boolean, default: false },
    courses: [
        {
            courseId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Course', // Assuming you have a Course model
            },
            lessons: [
                {
                    lessonId: {
                        type: mongoose_1.default.Schema.Types.ObjectId,
                    },
                    progress: {
                        type: Number,
                        default: 0, // Default progress is 0%
                        min: 0,
                        max: 100,
                    },
                    completed: {
                        type: Boolean,
                        default: false,
                    },
                    isOpened: {
                        type: Boolean,
                        default: false,
                    },
                    isEnabled: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
            courseProgress: {
                type: Number,
                default: 0, // Default course progress is 0%
                min: 0,
                max: 100,
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
});
exports.default = mongoose_1.default.model('Customers profile data', userSchema);
