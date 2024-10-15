import Course from '../models/courses';


/**
 * Retrieves all courses from the database and returns them as a JSON response.
 *
 * @param {any} req - The Express request object.
 * @param {any} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const getAllCourses = async (req: any, res: any) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).json({ message: 'No courses found' });
    }
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a single course from the database by its ID and returns it as a JSON response.
 *
 * @param {any} req - The Express request object, which should contain the course ID in the `params` property.
 * @param {any} res - The Express response object, which will be used to send the course data or an error message.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const getCourseById =  async (req: any, res: any) => {
  try {
    const course = await Course.findById(req.params.id);      
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
    console.log("working")

  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log("error")
  }
};
