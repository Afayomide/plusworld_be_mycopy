"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const course_1 = require("../controllers/course");
router.route('/').get(course_1.getAllCourses);
router.route('/:id').get(course_1.getCourseById);
module.exports = router;
