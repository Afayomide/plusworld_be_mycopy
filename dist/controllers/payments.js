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
exports.pay = exports.verify = exports.remove = void 0;
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const user_1 = __importDefault(require("../models/user"));
const courses_1 = __importDefault(require("../models/courses"));
const PAYSTACK_SECRET_KEY = process.env.paystack_secret_key;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.updateMany({}, { $set: { courses: [] } });
        return res
            .status(200)
            .json({ message: "All user courses have been removed successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while removing courses for all users",
            error: error.message,
        });
    }
});
exports.remove = remove;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reference } = req.params;
    const userId = req.user.userId;
    try {
        const response = yield axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });
        const { status, data } = response.data;
        const courseIds = data.metadata.courseIds;
        console.log("This is", courseIds, data.metadata);
        if (status && data.status === "success") {
            const user = yield user_1.default.findById(userId);
            if (user) {
                let newCoursesAdded = false;
                for (const courseId of courseIds) {
                    console.log(courseId);
                    const objectId = new mongoose.Types.ObjectId(courseId);
                    const courseExists = user.courses.some((course) => course &&
                        course.courseId &&
                        course.courseId.toString() === objectId.toString());
                    if (!courseExists) {
                        const course = yield courses_1.default.findById(objectId).populate("lessons.lessonId");
                        // if (course && course.courseModules) {
                        //     const lessons = course.courseModules.flatMap(module =>
                        //         module.lessons.map(lesson => (    {
                        //             lessonId: lesson._id,
                        //             progress: 0,
                        //             lessonIndex: lesson.lessonIndex,
                        //             completed: false,
                        //             isOpened: false,
                        //             isEnabled: false,
                        //         }))
                        //     );
                        if (course && course.courseModules) {
                            const lessons = course.courseModules.flatMap((module, moduleIndex) => module.lessons.map((lesson, lessonIndex) => ({
                                lessonId: lesson._id,
                                progress: 0,
                                lessonIndex: lesson.lessonIndex,
                                completed: false,
                                isOpened: false,
                                isEnabled: moduleIndex === 0 && lessonIndex === 0 ? true : false, // Enable the first lesson in the first module
                            })));
                            user.courses.push({
                                courseId: objectId,
                                progress: 0,
                                lessons: lessons,
                                completed: false,
                            });
                            newCoursesAdded = true;
                        }
                        else {
                            console.error(`Course with ID ${courseId} not found or has no lessons.`);
                        }
                    }
                }
                if (newCoursesAdded) {
                    yield user.save();
                    res.status(200).json({
                        status: "success",
                        message: "Payment verified and courses added to user",
                        data: data,
                    });
                }
                else {
                    res.status(409).json({
                        message: "All selected courses are already owned by user",
                    });
                }
            }
            else {
                res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            }
        }
        else {
            res.status(400).json({
                status: "error",
                message: "Payment verification failed",
                data: data,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while verifying payment",
            error: error.message,
        });
    }
});
exports.verify = verify;
const pay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, amount, courseIds, redirectUrl } = req.body;
    if (!Array.isArray(courseIds)) {
        var arrayCourseIds = [courseIds];
    }
    else {
        arrayCourseIds = courseIds;
    }
    try {
        const response = yield axios.post("https://api.paystack.co/transaction/initialize", {
            email: email,
            amount: amount * 100,
            metadata: {
                courseIds: arrayCourseIds,
            },
            callback_url: redirectUrl,
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        res.status(200).json({
            status: "success",
            message: "Payment initialized successfully",
            data: response.data.data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while initializing payment",
            error: error.message,
        });
    }
});
exports.pay = pay;
