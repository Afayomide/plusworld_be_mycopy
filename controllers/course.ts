import { Request, Response } from "express";
import Course from "../models/courses";

/**
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
    console.log("working");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log("error");
  }
};
