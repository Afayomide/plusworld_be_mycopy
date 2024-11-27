// routes/products.js
const mongoose = require("mongoose");
require("../models/test");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
import zlib from 'zlib';
require("dotenv").config();
import User from "../models/user";
import Course from "../models/courses";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const id = req.user.userId;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadUser = async (req: Request, res: Response) => {
  const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  interface UpdateUserData {
    fullname?: string;
    profileImage?: string;
    email?: string;
    phone?: string;
    username?: string;
    hobbies?: string;
    dob?: Date;
    location?: string;
    language?: string;
    goal?: string;
    profileCompleted?: boolean;
  }
  const id = req.user.userId;
  const {
    username,
    fullname,
    email,
    hobbies,
    dob,
    location,
    language,
    goal,
    phone,
  } = req.body;

  try {
    const updateData: UpdateUserData = {};

    if (req.file) {
      const file = req.file;
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `profile-images/${fileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      const profileImageUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      updateData.profileImage = profileImageUrl;
    }
    if (fullname) updateData.fullname = fullname;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (hobbies) updateData.hobbies = hobbies;
    if (dob) updateData.dob = dob;
    if (location) updateData.location = location;
    if (language) updateData.language = language;
    if (goal) updateData.goal = goal;

    const allFieldsFilled =
      fullname &&
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

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const cartAdd = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "Missing product ID" });
    }

    const course = await Course.findById(courseId);
    console.log(course);
    if (!course) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (user) {
      const existingProduct = user.cart.find(
        (item) => item._id.toString() === courseId
      );
      if (existingProduct) {
        console.log("already in cart");
        return res.status(400).json({ message: "Product already in cart" });
      } else {
        user.cart.push(course.toObject());
        await user.save();
      }
    }
    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const multipleCartAdd = async (req: any, res: any) => {
  const userId = req.user.userId;
  try {
    const { courseIds } = req.body;

    if (!courseIds || !Array.isArray(courseIds)) {
      return res.status(400).json({ message: "Invalid or missing course IDs" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const coursesToAdd = [];

    for (const courseId of courseIds) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res
          .status(404)
          .json({ message: `Course with ID ${courseId} not found` });
      }

      const existingCourse = user.cart.find(
        (item) => item._id.toString() === courseId
      );
      if (!existingCourse) {
        coursesToAdd.push(course.toObject());
      }
    }

    if (coursesToAdd.length > 0) {
      user.cart.push(...coursesToAdd);
      await user.save();
      return res.json({ message: "Courses added to cart successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "All courses are already in the cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cartRemove = async (req: any, res: any): Promise<void> => {
  const userId = req.user?.userId;
  const { productId } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    user.cart = user.cart.filter((item) => item._id.toString() !== productId);

    await user.save();

    res.status(200).json({ message: "Item deleted from cart successfully" });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cartList = async (req: Request, res: Response) => {
  const id = req.user.userId;

  try {
    const user = await User.findById(id);

    if (user) {
      const cartItems = user.cart.map(async (itemId) => {
        const item = await Course.findById(itemId);
        return item;
      });

      const resolvedCartItems = await Promise.all(cartItems);
      res.json({ cartItems: resolvedCartItems });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const courseProgress = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  try {
    const { courseId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseProgress = user.courses.find(
      (course) => course.courseId.toString() === courseId
    );

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
  } catch (error) {
    console.error("Error fetching user or course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLesson = async (req: any, res: Response) => {
  const userId = req.user.userId;
  const { courseId, lessonId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCourse = user.courses.find(
      (c) => c.courseId.toString() === courseId
    );
    if (!userCourse) {
      return res
        .status(404)
        .json({ message: "Course not found in user's courses" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.courseModules) {
      return res.status(404).json({ message: "Module not found" });
    }

    const lessons = course.courseModules.flatMap((module) => module.lessons);
    console.log(lessons);
    const currentLesson = lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (!currentLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    let userLesson;
    userLesson = userCourse.lessons.find(
      (l) => l.lessonId.toString() === lessonId
    );
    if (!userLesson) {
      userLesson = {
        lessonId: lessonId,
        isOpened: true,
        isEnabled: true,
        progress: 0,
        completed: false,
      };
      userCourse.lessons.push(userLesson);
    } else {
      userLesson.isOpened = true;
    }

    const nextLessonIndex = currentLesson.lessonIndex + 1;
    const nextLesson = lessons.find(
      (lesson) => lesson.lessonIndex === nextLessonIndex
    );

    if (nextLesson) {
      const nextLessonInUserCourse = userCourse.lessons.find(
        (l) => l.lessonId.toString() === nextLesson._id.toString()
      );

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

    await user.save();
    const plainCurrentLesson = JSON.parse(JSON.stringify(currentLesson));
    const plainUserLesson = JSON.parse(JSON.stringify(userLesson));

    const responseData = { ...plainUserLesson, ...plainCurrentLesson };

    // Compress the response data with GZIP
    zlib.gzip(JSON.stringify(responseData), (err:any, compressedData:any) => {
      if (err) {
        console.error("Error compressing data:", err);
        return res
          .status(500)
          .json({ message: "An error occurred while compressing the data" });
      }
      res.send(compressedData);
    });
    } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while retrieving the lesson",
      error: error.message,
    });
  }
};

export const getTest = async (req: any, res: Response) => {
  const userId = req.user.userId;
  const { courseId, testId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCourse = user.courses.find(
      (c) => c.courseId.toString() === courseId
    );
    if (!userCourse) {
      return res
        .status(404)
        .json({ message: "Course not found in user's courses" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.courseModules) {
      return res.status(404).json({ message: "Module not found" });
    }

    const test = course.courseModules.flatMap((module) => module.test);
    console.log(test);
    const currentTest = test.find((test) => test.toString() === testId);

    if (!currentTest) {
      return res.json({ message: "test not found" });
    }
    const populatedTest = await mongoose
      .model("Test")
      .findById(currentTest)
      .populate();

    let userTest;
    userTest = userCourse?.tests.find((t) => t.testId.toString() === testId);
    if (!userTest) {
      userTest = {
        testId: testId,
        isEnabled: false,
        passed: false,
        score: "0",
        isOpened: true,
      };
      userCourse?.tests.push(userTest);
    } else {
      userTest.isOpened = true;
    }

    await user.save();

    const plainPopulatedTest = populatedTest.toObject();
    const plainUserTest = JSON.parse(JSON.stringify(userTest));
    return res.json({ ...plainUserTest, ...plainPopulatedTest });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while retrieving the test",
      error: error.message,
    });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  var lessonOrTest;
  const { courseId, lessonId } = req.params;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the course in user's courses
    const userCourse = user.courses.find(
      (c) => c.courseId.toString() === courseId
    );
    if (!userCourse) {
      return res
        .status(404)
        .json({ message: "Course not found in user's courses" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.courseModules) {
      return res.status(404).json({ message: "Modules not found in course" });
    }

    const currentModule = course.courseModules.find((module) =>
      module.lessons.some((lesson) => lesson._id.toString() === lessonId)
    );
    if (!currentModule) {
      return res.json(404).json({ message: "no course module" });
    }
    const currentLesson = currentModule?.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (!currentLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    let userLesson = userCourse.lessons.find(
      (l) => l.lessonId.toString() === lessonId
    );
    if (userLesson) {
      userLesson.completed = true;
      userLesson.progress = 100; // Mark the lesson as fully completed
    } else {
      return res
        .status(404)
        .json({ message: "Lesson not found in user's course progress" });
    }

    const nextLessonIndex = currentLesson.lessonIndex + 1;
    let nextLesson = currentModule.lessons.find(
      (lesson) => lesson.lessonIndex === nextLessonIndex
    );

    if (!nextLesson) {
      let nextTest = currentModule.test;
      let nextUserTest = userCourse.tests.find(
        (t) => t.testId.toString() === nextTest.toString()
      );
      if (!nextUserTest) {
        res.status(404).json({ message: "test not found" });
        const currentModuleIndex = currentModule.moduleIndex;
        const nextModule = course.courseModules.find(
          (module) => module.moduleIndex === currentModuleIndex + 1
        );
        if (nextModule) {
          nextLesson = nextModule.lessons[0];
        }
      } else {
        console.log("changing to true");
        nextUserTest.isEnabled = true;
        lessonOrTest = "Test";
      }
    }

    if (nextLesson) {
      let nextUserLesson = userCourse.lessons.find(
        (l) => l.lessonId.toString() === nextLesson._id.toString()
      );

      if (!nextUserLesson) {
        userCourse.lessons.push({
          lessonId: nextLesson._id,
          isOpened: false,
          isEnabled: true,
          progress: 0,
          completed: false,
        });
      } else {
        nextUserLesson.isEnabled = true;
        lessonOrTest = "next lesson";
      }
    }

    await user.save();
    return res.json({
      message: `Lesson marked as completed and ${lessonOrTest} enabled`,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while completing the lesson",
      error: error.message,
    });
  }
};

export const getPaidCourses = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const paidCoursesIds = user.courses.map((course) => course.courseId);

    if (paidCoursesIds.length === 0) {
      return res.status(404).json({ message: "No paid courses found" });
    }
    const paidCourses = await Promise.all(
      paidCoursesIds.map(async (courseId) => {
        try {
          return await Course.findById(courseId);
        } catch (error) {
          console.error(`Error finding course with ID ${courseId}:`, error);
          return null;
        }
      })
    );
    const filteredCourses = paidCourses.filter((course) => course !== null);

    res.json(filteredCourses);
    console.log(filteredCourses);
  } catch (error) {
    console.error("error fetching users or courses", error);
    res.json(error);
  }
};

export const getPaidCourse = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { courseId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const objectId = new mongoose.Types.ObjectId(courseId);

    // Check if the courseId exists in the user's paid courses
    const userCourse = user.courses.find(
      (course) => course.courseId.toString() === objectId.toString()
    );

    if (!userCourse) {
      return res
        .status(404)
        .json({ message: "Course not found in user's paid course" });
    }

    const course = await Course.findById(objectId).populate({
      path: "courseModules.test", // Assuming 'tests' is an array of ObjectIds in courseModules
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const lessonProgressMap = new Map(
      userCourse.lessons.map((lesson) => [lesson.lessonId.toString(), lesson])
    );
    const testProgressMap = new Map(
      userCourse.tests.map((test) => [test.testId.toString(), test])
    );

    const courseWithLessonProgress = {
      ...course.toObject(),
      courseModules: course.courseModules?.map((module) => ({
        moduleName: module.moduleName,
        moduleIndex: module.moduleIndex,
        test: (() => {
          const test = module.test;
          const plainTest = JSON.parse(JSON.stringify(test));

          const userTestProgress = testProgressMap.get(
            plainTest._id.toString()
          );
          return {
            ...plainTest,
            isEnabled: userTestProgress ? userTestProgress.isEnabled : false,
            passed: userTestProgress ? userTestProgress.passed : false,
            score: userTestProgress ? userTestProgress.score : "0",
            isOpened: userTestProgress ? userTestProgress.isOpened : false,
          };
        })(),
        lessons: module.lessons.map((lesson) => {
          const userLessonProgress = lessonProgressMap.get(
            lesson._id.toString()
          );

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
      })),
    };

    const response = {
      course: courseWithLessonProgress,
      // courseProgress: userCourse.progress, // Include the overall course progress
      completed: userCourse.completed,
    };

    res.json(response);
  } catch (error: any) {
    console.error("Error fetching user or course", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const markTest = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { courseId, testId } = req.params;
  const { score } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCourse = user.courses.find(
      (c) => c.courseId.toString() === courseId
    );
    if (!userCourse) {
      return res
        .status(404)
        .json({ message: "Course not found in user's courses" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.courseModules) {
      return res.status(404).json({ message: "Modules not found in course" });
    }

    let userTest = userCourse.tests.find((t) => t.testId.toString() === testId);
    if (!userTest) {
      return res
        .status(404)
        .json({ message: "Test not found in user's course progress" });
    }

    userTest.score = score.toString();
    if (parseInt(score) >= 80) {
      userTest.passed = true;

      const currentModule = course.courseModules.find(
        (module) => module.test.toString() === testId // Find module by test ID
      );
      if (!currentModule) {
        return res.status(404).json("module not found");
      }
      const currentModuleIndex = currentModule.moduleIndex;
      console.log(currentModuleIndex);

      if (currentModuleIndex !== -1) {
        const nextModule = course.courseModules.find(
          (module) => module.moduleIndex === currentModuleIndex + 1
        );
        if (nextModule && nextModule.lessons.length > 0) {
          const firstLessonId = nextModule.lessons[0]._id;
          const userLesson = userCourse.lessons.find(
            (lesson) => lesson.lessonId.toString() === firstLessonId.toString()
          );

          if (userLesson) {
            userLesson.isEnabled = true;
          }
        }
      }
    }

    await user.save();

    return res.json({
      message: "Test marked successfully",
      testResult: userTest,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while marking the test",
      error: error.message,
    });
  }
};
