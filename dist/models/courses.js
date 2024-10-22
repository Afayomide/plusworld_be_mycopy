"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CourseLessonSchema = new mongoose_1.Schema({
    lessonNo: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    lessonIndex: { type: Number, required: true },
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true }
});
const CourseModuleSchema = new mongoose_1.Schema({
    moduleName: { type: String, required: true },
    moduleIndex: { type: Number, required: true },
    lessons: { type: [CourseLessonSchema], required: true },
});
const TutorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    about: { type: String, required: false },
    profileImage: { type: String, required: true },
    socialMedia: {
        twitter: { type: String, required: false },
        linkedin: { type: String, required: false },
        facebook: { type: String, required: false },
        instagram: { type: String, required: false },
    }
});
const CourseSchema = new mongoose_1.Schema({
    courseName: { type: String, required: true },
    courseImage: { type: String, required: false },
    // courseTitle: { type: String, required: true },
    tutors: { type: [TutorSchema], required: true },
    courseCategory: { type: String, required: true },
    courseMedia: { type: String, required: false },
    courseModules: { type: [CourseModuleSchema], required: false },
    mediaType: {
        type: String,
        enum: ['video', 'pptx', 'pdf', 'ebook', 'image', 'audio'],
        required: false,
    },
    new: { type: Boolean, required: true },
    price: { type: Number, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    lessons: { type: Number, required: true },
    quizzes: { type: Number, required: true },
    certification: { type: Boolean, required: true },
    graduation: { type: String },
    description: { type: String, required: true },
    modules: { type: [String], required: true },
    learningOutcome: { type: [String], required: true },
    students: { type: Number, default: 0, required: true },
    dateCreated: { type: Date, default: Date.now },
});
const Course = mongoose_1.default.model('Course', CourseSchema);
exports.default = Course;
