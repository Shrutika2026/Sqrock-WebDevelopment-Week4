import mongoose, { Schema, Document, Model } from "mongoose";

const LessonSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "notes", "quiz", "coding"], required: true },
  videoUrl: String,
  content: String,
  duration: Number,
  order: { type: Number, required: true },
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
  codingProblemId: { type: Schema.Types.ObjectId, ref: "CodingProblem" },
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  lessons: [LessonSchema],
  order: { type: Number, required: true },
});

export interface ILesson {
  _id?: mongoose.Types.ObjectId;
  title: string;
  type: "video" | "notes" | "quiz" | "coding";
  videoUrl?: string;
  content?: string;
  duration?: number;
  order: number;
  quizId?: mongoose.Types.ObjectId;
  codingProblemId?: mongoose.Types.ObjectId;
}

export interface IModule {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  lessons: ILesson[];
  order: number;
}

export interface ICourseDocument extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  instructor: mongoose.Types.ObjectId;
  modules: IModule[];
  tags: string[];
  isPublished: boolean;
  enrolledCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourseDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    price: { type: Number, default: 0 },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    modules: [ModuleSchema],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    enrolledCount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
  },
  { timestamps: true }
);

export const Course: Model<ICourseDocument> =
  mongoose.models.Course || mongoose.model<ICourseDocument>("Course", CourseSchema);
