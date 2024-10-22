// routes/products.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

require("dotenv").config();

import {
  cartAdd,
  cartList,
  cartRemove,
  courseProgress,
  getLesson,
  getPaidCourses,
  getPaidCoursesId,
  getUser,
  multipleCartAdd,
  updateProgress,
  uploadUser,
} from "../controllers/user";

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

router.route("/").get(getUser);


router.route("/").put(upload.single("profileImage"), uploadUser);

router.route("/cart/add").post(cartAdd);

router.route("/multiplecart/add").post(multipleCartAdd);

router.route("/cart/remove").delete(cartRemove);

router.route("/cart/list").get(cartList);

router.route("/courseprogress/:courseId").get(courseProgress);

router.route("/courses/:courseId/lesson/:lessonId").get(getLesson);

router
  .route("/courses/:courseId/lesson/:lessonId/complete")
  .post(updateProgress);

router.route("/paidcourses").get(getPaidCourses);

router.route("/paidcourses/:courseId").get(getPaidCoursesId);

module.exports = router;
