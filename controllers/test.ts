const mongoose = require("mongoose");
require("dotenv").config();
import User from "../models/user";
import Course from "../models/courses";
import { Request, Response } from "express";
import Test from "../models/test";

interface CreateTestRequest extends Request {
    body: {
      testName: string;
      courseId: string;
      questions: {
        questionText: string;
        options: string[];
        correctAnswer: string;
      }[];
    };
  }

export const getTest = async function (req:CreateTestRequest, res:Response) {
    
};
