import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubmissionDocument extends Document {
  student: mongoose.Types.ObjectId;
  problem: mongoose.Types.ObjectId;
  code: string;
  language: string;
  status: "accepted" | "wrong_answer" | "runtime_error" | "pending";
  testResults: {
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
  }[];
  score: number;
  submittedAt: Date;
}

const SubmissionSchema = new Schema<ISubmissionDocument>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    problem: { type: Schema.Types.ObjectId, ref: "CodingProblem", required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    status: {
      type: String,
      enum: ["accepted", "wrong_answer", "runtime_error", "pending"],
      default: "pending",
    },
    testResults: [
      {
        passed: Boolean,
        input: String,
        expected: String,
        actual: String,
      },
    ],
    score: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Submission: Model<ISubmissionDocument> =
  mongoose.models.Submission ||
  mongoose.model<ISubmissionDocument>("Submission", SubmissionSchema);
