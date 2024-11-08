import mongoose, { Document, Schema } from "mongoose";

interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface ITest extends Document {
  testName: string;
  courseName: string;
  moduleName: string;
  questions: IQuestion[];
  createdDate: Date;
  type: string;
}

const testSchema: Schema = new Schema({
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