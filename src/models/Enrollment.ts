import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnrollmentDocument extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  progress: number;
  completedLessons: string[];
  quizScores: { quizId: mongoose.Types.ObjectId; score: number; passed: boolean }[];
  enrolledAt: Date;
  completedAt?: Date;
}

const EnrollmentSchema = new Schema<IEnrollmentDocument>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    completedLessons: [{ type: String }],
    quizScores: [
      {
        quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
        score: Number,
        passed: Boolean,
      },
    ],
    enrolledAt: { type: Date, default: Date.now },
    completedAt: Date,
  },
  { timestamps: true }
);

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment: Model<IEnrollmentDocument> =
  mongoose.models.Enrollment ||
  mongoose.model<IEnrollmentDocument>("Enrollment", EnrollmentSchema);
