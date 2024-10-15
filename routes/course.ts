const express = require('express');
const router = express.Router();
import { getAllCourses, getCourseById } from '../controllers/course';

router.route('/').get(getAllCourses);

router.route('/:id').get(getCourseById);

module.exports = router;