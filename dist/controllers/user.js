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
exports.getPaidCoursesId = exports.getPaidCourses = exports.updateProgress = exports.getLesson = exports.courseProgress = exports.cartList = exports.cartRemove = exports.multipleCartAdd = exports.cartAdd = exports.uploadUser = exports.getUser = void 0;
// routes/products.js
const mongoose = require("mongoose");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const user_1 = __importDefault(require("../models/user"));
const courses_1 = __importDefault(require("../models/courses"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    try {
        const user = yield user_1.default.findById(id).select("-password");
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUser = getUser;
const uploadUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new S3Client({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    const id = req.user.userId;
    const { username, fullname, email, hobbies, dob, location, language, goal, phone, } = req.body;
    try {
        const updateData = {};
        if (req.file) {
            const file = req.file;
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
            // Upload image to S3
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `profile-images/${fileName}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read",
            };
            const command = new PutObjectCommand(params);
            yield s3.send(command);
            const profileImageUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
            updateData.profileImage = profileImageUrl; // Store the S3 URL in the profile
        }
        if (fullname)
            updateData.fullname = fullname;
        if (username)
            updateData.username = username;
        if (email)
            updateData.email = email;
        if (phone)
            updateData.phone = phone;
        if (hobbies)
            updateData.hobbies = hobbies;
        if (dob)
            updateData.dob = dob;
        if (location)
            updateData.location = location;
        if (language)
            updateData.language = language;
        if (goal)
            updateData.goal = goal;
        const allFieldsFilled = fullname &&
            username &&
            updateData.profileImage &&
            email &&
            phone &&
            hobbies &&
            location &&
            language &&
            goal;
        if (allFieldsFilled) {
            updateData.profileCompleted = true;
        }
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.uploadUser = uploadUser;
const cartAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ message: "Missing product ID" });
        }
        const course = yield courses_1.default.findById(courseId);
        console.log(course);
        if (!course) {
            return res.status(404).json({ message: "Product not found" });
        }
        const user = yield user_1.default.findById(userId);
        if (user) {
            const existingProduct = user.cart.find((item) => item._id.toString() === courseId);
            if (existingProduct) {
                console.log("already in cart");
                return res.status(400).json({ message: "Product already in cart" });
            }
            else {
                user.cart.push(course.toObject());
                yield user.save();
            }
        }
        res.json({ message: "Product added to cart successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.cartAdd = cartAdd;
const multipleCartAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const { courseIds } = req.body;
        if (!courseIds || !Array.isArray(courseIds)) {
            return res.status(400).json({ message: "Invalid or missing course IDs" });
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const coursesToAdd = [];
        for (const courseId of courseIds) {
            const course = yield courses_1.default.findById(courseId);
            if (!course) {
                return res
                    .status(404)
                    .json({ message: `Course with ID ${courseId} not found` });
            }
            const existingCourse = user.cart.find((item) => item._id.toString() === courseId);
            if (!existingCourse) {
                coursesToAdd.push(course.toObject());
            }
        }
        if (coursesToAdd.length > 0) {
            user.cart.push(...coursesToAdd);
            yield user.save();
            return res.json({ message: "Courses added to cart successfully" });
        }
        else {
            return res
                .status(400)
                .json({ message: "All courses are already in the cart" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.multipleCartAdd = multipleCartAdd;
const cartRemove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { productId } = req.body;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        user.cart = user.cart.filter((item) => item._id.toString() !== productId);
        yield user.save();
        res.status(200).json({ message: "Item deleted from cart successfully" });
    }
    catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.cartRemove = cartRemove;
const cartList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    try {
        const user = yield user_1.default.findById(id);
        if (user) {
            const cartItems = user.cart.map((itemId) => __awaiter(void 0, void 0, void 0, function* () {
                const item = yield courses_1.default.findById(itemId);
                return item;
            }));
            const resolvedCartItems = yield Promise.all(cartItems);
            res.json({ cartItems: resolvedCartItems });
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.cartList = cartList;
const courseProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const { courseId } = req.params;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const courseProgress = user.courses.find((course) => course.courseId.toString() === courseId);
        if (!courseProgress) {
            return res
                .status(404)
                .json({ message: "Course not found in user's course list" });
        }
        // res.json({
        //   courseId: courseProgress.courseId,
        //   progress: courseProgress.progress,
        //   completed: courseProgress.completed,
        // });
        return res.json({
            courseProgress,
        });
    }
    catch (error) {
        console.error("Error fetching user or course:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.courseProgress = courseProgress;
const getLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { courseId, lessonId } = req.params;
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userCourse = user.courses.find((c) => c.courseId.toString() === courseId);
        if (!userCourse) {
            return res
                .status(404)
                .json({ message: "Course not found in user's courses" });
        }
        const course = yield courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (!course.courseModules) {
            return res.status(404).json({ message: "Module not found" });
        }
        const lessons = course.courseModules.flatMap((module) => module.lessons);
        console.log(lessons);
        const currentLesson = lessons.find((lesson) => lesson._id.toString() === lessonId);
        if (!currentLesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        let userLesson;
        userLesson = userCourse.lessons.find((l) => l.lessonId.toString() === lessonId);
        if (!userLesson) {
            userLesson = {
                lessonId: lessonId,
                isOpened: true,
                isEnabled: true,
                progress: 0,
                completed: false,
            };
            userCourse.lessons.push(userLesson);
        }
        else {
            userLesson.isOpened = true;
        }
        const nextLessonIndex = currentLesson.lessonIndex + 1;
        const nextLesson = lessons.find((lesson) => lesson.lessonIndex === nextLessonIndex);
        if (nextLesson) {
            const nextLessonInUserCourse = userCourse.lessons.find((l) => l.lessonId.toString() === nextLesson._id.toString());
            if (!nextLessonInUserCourse) {
                userCourse.lessons.push({
                    lessonId: nextLesson._id,
                    isOpened: false,
                    isEnabled: false,
                    progress: 0,
                    completed: false,
                });
            }
        }
        yield user.save();
        return res.json({ currentLesson, userLesson });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while retrieving the lesson",
            error: error.message,
        });
    }
});
exports.getLesson = getLesson;
const updateProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { courseId, lessonId } = req.params;
    try {
        // Find the user
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find the course in user's courses
        const userCourse = user.courses.find((c) => c.courseId.toString() === courseId);
        if (!userCourse) {
            return res
                .status(404)
                .json({ message: "Course not found in user's courses" });
        }
        // Find the course from the Course collection
        const course = yield courses_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (!course.courseModules) {
            return res.status(404).json({ message: "Modules not found in course" });
        }
        // Find the current lesson by lessonId
        const currentModule = course.courseModules.find((module) => module.lessons.some((lesson) => lesson._id.toString() === lessonId));
        if (!currentModule) {
            return res.json(404).json({ message: "no course module" });
        }
        const currentLesson = currentModule === null || currentModule === void 0 ? void 0 : currentModule.lessons.find((lesson) => lesson._id.toString() === lessonId);
        if (!currentLesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        // Mark the current lesson as completed in user's course
        let userLesson = userCourse.lessons.find((l) => l.lessonId.toString() === lessonId);
        if (userLesson) {
            userLesson.completed = true;
            userLesson.progress = 100; // Mark the lesson as fully completed
        }
        else {
            return res
                .status(404)
                .json({ message: "Lesson not found in user's course progress" });
        }
        // Find the next lesson within the same module
        const nextLessonIndex = currentLesson.lessonIndex + 1;
        let nextLesson = currentModule.lessons.find((lesson) => lesson.lessonIndex === nextLessonIndex);
        // If there is no next lesson in the current module, move to the next module's first lesson
        if (!nextLesson) {
            const currentModuleIndex = currentModule.moduleIndex;
            const nextModule = course.courseModules.find((module) => module.moduleIndex === currentModuleIndex + 1);
            if (nextModule) {
                nextLesson = nextModule.lessons[0]; // Get the first lesson of the next module
            }
        }
        // Enable the next lesson if found
        if (nextLesson) {
            let nextUserLesson = userCourse.lessons.find((l) => l.lessonId.toString() === nextLesson._id.toString());
            if (!nextUserLesson) {
                // Add the next lesson with isEnabled = true
                userCourse.lessons.push({
                    lessonId: nextLesson._id,
                    isOpened: false,
                    isEnabled: true, // Enable the next lesson
                    progress: 0,
                    completed: false,
                });
            }
            else {
                // If the lesson already exists in the user's progress, just enable it
                nextUserLesson.isEnabled = true;
            }
        }
        yield user.save();
        return res.json({
            message: "Lesson marked as completed and next lesson enabled",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while completing the lesson",
            error: error.message,
        });
    }
});
exports.updateProgress = updateProgress;
const getPaidCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const paidCoursesIds = user.courses.map((course) => course.courseId);
        if (paidCoursesIds.length === 0) {
            return res.status(404).json({ message: "No paid courses found" });
        }
        const paidCourses = yield Promise.all(paidCoursesIds.map((courseId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield courses_1.default.findById(courseId);
            }
            catch (error) {
                console.error(`Error finding course with ID ${courseId}:`, error);
                return null;
            }
        })));
        const filteredCourses = paidCourses.filter((course) => course !== null);
        res.json(filteredCourses);
        console.log(filteredCourses);
    }
    catch (error) {
        console.error("error fetching users or courses", error);
        res.json(error);
    }
});
exports.getPaidCourses = getPaidCourses;
const getPaidCoursesId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.user.userId;
    const { courseId } = req.params;
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const objectId = new mongoose.Types.ObjectId(courseId);
        // Check if the courseId exists in the user's paid courses
        const userCourse = user.courses.find((course) => course.courseId.toString() === objectId.toString());
        if (!userCourse) {
            return res
                .status(404)
                .json({ message: "Course not found in user's paid courses" });
        }
        // Fetch the course from the database
        const course = yield courses_1.default.findById(objectId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        // Create a map for the user's lesson progress by lessonId
        const lessonProgressMap = new Map(userCourse.lessons.map((lesson) => [lesson.lessonId.toString(), lesson]));
        console.log(lessonProgressMap);
        // Iterate over the course modules and lessons, and attach the progress data
        const courseWithLessonProgress = Object.assign(Object.assign({}, course.toObject()), { courseModules: (_a = course.courseModules) === null || _a === void 0 ? void 0 : _a.map((module) => ({
                moduleName: module.moduleName,
                moduleIndex: module.moduleIndex, // Remove internal properties like `__parentArray`
                lessons: module.lessons.map((lesson) => {
                    console.log(lesson);
                    const userLessonProgress = lessonProgressMap.get(lesson._id.toString());
                    // If a match is found, attach the user's lesson progress
                    return {
                        _id: lesson._id,
                        lessonNo: lesson.lessonNo,
                        lessonIndex: lesson.lessonIndex,
                        mediaUrl: lesson.mediaUrl,
                        progress: userLessonProgress ? userLessonProgress.progress : 0,
                        completed: userLessonProgress
                            ? userLessonProgress.completed
                            : false,
                        isOpened: userLessonProgress ? userLessonProgress.isOpened : false,
                        isEnabled: userLessonProgress
                            ? userLessonProgress.isEnabled
                            : false,
                    };
                }),
            })) });
        // Attach the full response including course and lesson progress
        const response = {
            course: courseWithLessonProgress,
            // courseProgress: userCourse.progress, // Include the overall course progress
            completed: userCourse.completed, // Include whether the course is completed
        };
        res.json(response);
    }
    catch (error) {
        console.error("Error fetching user or course", error);
        res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
});
exports.getPaidCoursesId = getPaidCoursesId;
