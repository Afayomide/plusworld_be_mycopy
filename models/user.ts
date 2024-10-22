
import mongoose, {Types} from 'mongoose';


interface CartItem {
  _id: mongoose.Schema.Types.ObjectId; // or `string` if ObjectId is stored as a string
  // other properties can go here
}
interface LessonProgress {
  lessonId: mongoose.Schema.Types.ObjectId;
  progress: number;
  completed: boolean;
  isOpened: boolean;
  isEnabled: boolean;
}

interface CourseAndProgress {
  courseId: mongoose.Schema.Types.ObjectId; // or `string` if ObjectId is stored as a string
  lessons: LessonProgress[];
  progress: number; // Progress as a percentage (0-100)
  completed: boolean;
}


export interface User {
  fullname: string;
  username: string;
  profileImage: string;
  email: string;
  phone: string;
  hobbies: string;
  dob: Date;
  password: string;
  location: string;
  language: string;
  goal: string;
  cart: CartItem[];
  profileCompleted: boolean
  courses: CourseAndProgress[];
  token?: string;
  tokenExpires?: Date;
  status? : string;
}

const userSchema = new mongoose.Schema<User>({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true }, 
  profileImage: {type: String, required: false, unique: true},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false, unique: true },
  hobbies: {type: String, required: false},
  dob: { type: Date, required: false },
  password: { type: String, required: true },
  location: {type: String, required: false},
  language: {type: String, required: false},
  goal: {type: String, required: false},
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
    },
  ],
  profileCompleted: {type: Boolean, default: false },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Assuming you have a Course model
      },
      lessons: [
        {
          lessonId: {
            type: mongoose.Schema.Types.ObjectId,
          },
          progress: {
            type: Number,
            default: 0, // Default progress is 0%
            min: 0,
            max: 100,
          },
          completed: {
            type: Boolean,
            default: false,
          },
          isOpened: {
            type: Boolean,
            default: false,
          },
          isEnabled: {
            type: Boolean,
            default: false,
          },
        },
      ],
      courseProgress: {
        type: Number,
        default: 0, // Default course progress is 0%
        min: 0,
        max: 100,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  token: {
    type: String,
    required: false, 
  },
  tokenExpires: {
    type: Date,
    required: false
  },
  status :{
    type: String,
    required: false
  }
});

export default mongoose.model<User>('Customers profile data', userSchema);
