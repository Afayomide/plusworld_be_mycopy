import mongoose, { Document, Schema } from "mongoose";

interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface ITest extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  testName: string;
  courseName: string;
  moduleName: string;
  questions: IQuestion[];
  createdDate: Date;
  type: string;
}

export const testSchema: Schema = new Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
  testName: { type: String, required: true },
  courseName: { type: String, required: true },
  moduleName: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  createdDate: { type: Date, default: Date.now },
  type: { type: String, default: "test" },
});

const Test = mongoose.model<ITest>("Test", testSchema);

export default Test;