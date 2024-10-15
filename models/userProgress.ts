import mongoose, { Document, Schema } from 'mongoose';

interface IUserProgress extends Document {
  userId: string;
  courseId: string;
  sectionsCompleted: number;
  startTime: Date;
  status: 'not started' | 'in progress' | 'finished';
}

const UserProgressSchema: Schema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  sectionsCompleted: { type: Number, default: 0 },
  startTime: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['not started', 'in progress', 'finished'],
    default: 'not started',
  },
});

const UserProgress = mongoose.model<IUserProgress>(
  'UserProgress',
  UserProgressSchema
);
export default UserProgress;
