const express = require("express");
const router = express.Router();
import Test from '../models/test';
import Course from '../models/courses';
import { getTest } from '../controllers/test';


router.route("/getTest").get(getTest);


module.exports = router;