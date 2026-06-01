import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuizDocument extends Document {
  title: string;
  description?: string;
  courseId?: mongoose.Types.ObjectId;
  category?: string;
  level?: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
  timeLimit?: number;
  passingScore: number;
  totalPoints: number;
  createdAt: Date;
}

const QuizSchema = new Schema<IQuizDocument>(
  {
    title: { type: String, required: true },
    description: String,
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    category: String,
    level: String,
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true },
        explanation: String,
      },
    ],
    timeLimit: Number,
    passingScore: { type: Number, default: 60 },
    totalPoints: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export const Quiz: Model<IQuizDocument> =
  mongoose.models.Quiz || mongoose.model<IQuizDocument>("Quiz", QuizSchema);
