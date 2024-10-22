"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/products.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv").config();
const user_1 = require("../controllers/user");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// router.post("/", async (req: Request, res: any) => {
//   const update = { courses: [] };
//   const criteria = {};
//   await User.updateMany(criteria, update);
//   const user = await User.find();
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   return res.json({ user });
// });
router.get("/").get(user_1.getUser);
router.put("/").put(upload.single("profileImage"), user_1.uploadUser);
router.route("/cart/add").post(user_1.cartAdd);
router.route("/multiplecart/add").post(user_1.multipleCartAdd);
router.route("/cart/remove").delete(user_1.cartRemove);
router.route("/cart/list").get(user_1.cartList);
router.route("/courseprogress/:courseId").get(user_1.courseProgress);
router.route("/courses/:courseId/lesson/:lessonId").get(user_1.getLesson);
router
    .route("/courses/:courseId/lesson/:lessonId/complete")
    .post(user_1.updateProgress);
router.route("/paidcourses").get(user_1.getPaidCourses);
router.route("/paidcourses/:courseId").get(user_1.getPaidCoursesId);
module.exports = router;
