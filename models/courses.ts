import mongoose, { Document, Schema } from 'mongoose';

interface Tutor {
  name: string;
  about?: string;
  profileImage: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}

interface CourseLesson {
  lessonNo: string;
  lessonIndex: number;
  mediaUrl: string;
  _id: mongoose.Schema.Types.ObjectId;
}

interface CourseModule {
  moduleName: string;
  moduleIndex: number;
  lessons: CourseLesson[];
}


interface ICourse extends Document {
  courseName: string;
  courseImage: string;
  // courseTitle: string;
  tutors: Tutor[];
  courseCategory: string;
  courseMedia?: string;
  courseModules?: CourseModule[]
  mediaType?: string;
  new: boolean;
  price: number;
  level: string;
  duration: string; 
  lessons: number;
  quizzes: number;
  certification: boolean;
  graduation: string;
  description: string;
  modules: string[],
  learningOutcome: string[],
  students: number;
  dateCreated: Date;
}

const CourseLessonSchema: Schema = new Schema({
  lessonNo: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  lessonIndex: {type: Number, required: true},
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true}
});

const CourseModuleSchema: Schema = new Schema({
  moduleName: { type: String, required: true },
  moduleIndex: {type: Number, required: true},
  lessons: { type: [CourseLessonSchema], required: true },
});

const TutorSchema: Schema = new Schema({
  name: { type: String, required: true },
  about: { type: String, required: false },
  profileImage:{type: String, required: true},
  socialMedia: {
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram:{type: String, required: false},
  }
});

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true },
  courseImage: {type: String, required:false},
  // courseTitle: { type: String, required: true },
  tutors: { type: [TutorSchema], required: true },
  courseCategory: { type: String, required: true },
  courseMedia: { type: String, required: false },
  courseModules: { type: [CourseModuleSchema], required: false},
  mediaType: {
    type: String,
    enum: ['video', 'pptx', 'pdf', 'ebook', 'image', 'audio'],
    required: false,
  },
  new: { type: Boolean, required: true },
  price: { type: Number, required: true },
  level: {type: String, required: true},
  duration: { type: String, required: true },
  lessons: {type: Number, required: true},
  quizzes: {type: Number, required: true},
  certification: {type: Boolean, required: true},
  graduation: {type: String},
  description: { type: String, required: true },
  modules:{type: [String], required: true},
  learningOutcome: {type: [String], required: true},
  students: {type: Number, default: 0, required: true},
  dateCreated: { type: Date, default: Date.now },
});

const Course = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
