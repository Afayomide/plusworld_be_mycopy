const mongoose = require("mongoose");

const axios = require("axios");
require("dotenv").config();
import User from "../models/user";
import Course from "../models/courses";
import { Request, Response } from "express";
import Test from "../models/test";

const PAYSTACK_SECRET_KEY = process.env.paystack_secret_key;

export const remove = async (req: Request, res: Response) => {
  try {
    await User.updateMany({}, { $set: { courses: [] } });

    return res
      .status(200)
      .json({ message: "All user courses have been removed successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while removing courses for all users",
      error: error.message,
    });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { reference } = req.params;
  const userId = req.user.userId;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data } = response.data;
    const courseIds = data.metadata.courseIds;
    console.log("This is", courseIds, data.metadata);

    if (status && data.status === "success") {
      const user = await User.findById(userId);

      if (user) {
        let newCoursesAdded = false;
        for (const courseId of courseIds) {
          console.log(courseId);
          const objectId = new mongoose.Types.ObjectId(courseId);
          const courseExists = user.courses.some(
            (course) =>
              course &&
              course.courseId &&
              course.courseId.toString() === objectId.toString()
          );
          if (!courseExists) {
            const course = await Course.findById(objectId).populate(
              "lessons.lessonId"
            );

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
              const lessons = course.courseModules.flatMap(
                (module, moduleIndex) =>
                  module.lessons.map((lesson, lessonIndex) => ({
                    lessonId: lesson._id,
                    progress: 0,
                    lessonIndex: lesson.lessonIndex,
                    completed: false,
                    isOpened: false,
                    isEnabled:
                      moduleIndex === 0 && lessonIndex === 0 ? true : false, // Enable the first lesson in the first module
                  }))
              );
              const tests = (
                await Promise.all(
                  course.courseModules.map(async (module, moduleIndex) => {
                    const foundTests = await Test.find({
                      _id: { $in: module.test },
                    });
                    return foundTests.map((test) => ({
                      testId: test._id,
                      passed: false,
                      isOpened: false,
                      score: "0",
                      isEnabled: moduleIndex === 0 ? true : false,
                    }));
                  })
                )
              ).flat();

              user.courses.push({
                courseId: objectId,
                progress: 0,
                lessons: lessons,
                tests: tests,
                completed: false,
              });
              newCoursesAdded = true;
            } else {
              console.error(
                `Course with ID ${courseId} not found or has no lessons.`
              );
            }
          }
        }

        if (newCoursesAdded) {
          await user.save();
          res.status(200).json({
            status: "success",
            message: "Payment verified and courses added to user",
            data: data,
          });
        } else {
          res.status(409).json({
            message: "All selected courses are already owned by user",
          });
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
    } else {
      res.status(400).json({
        status: "error",
        message: "Payment verification failed",
        data: data,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while verifying payment",
      error: error.message,
    });
  }
};

export const pay = async (req: Request, res: Response) => {
  const { email, amount, courseIds, redirectUrl } = req.body;

  if (!Array.isArray(courseIds)) {
    var arrayCourseIds = [courseIds];
  } else {
    arrayCourseIds = courseIds;
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amount * 100,
        metadata: {
          courseIds: arrayCourseIds,
        },
        callback_url: redirectUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Payment initialized successfully",
      data: response.data.data,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while initializing payment",
      error: error.message,
    });
  }
};
