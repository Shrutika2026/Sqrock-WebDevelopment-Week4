import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICodingProblemDocument extends Document {
  title: string;
  slug: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  testCases: { input: string; expectedOutput: string; isHidden?: boolean }[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  hints: string[];
  points: number;
  solvedCount: number;
  createdAt: Date;
}

const CodingProblemSchema = new Schema<ICodingProblemDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    category: { type: String, required: true },
    testCases: [
      {
        input: String,
        expectedOutput: String,
        isHidden: { type: Boolean, default: false },
      },
    ],
    starterCode: {
      javascript: { type: String, default: "// Write your code here\n" },
      python: { type: String, default: "# Write your code here\n" },
      java: { type: String, default: "// Write your code here\n" },
      cpp: { type: String, default: "// Write your code here\n" },
    },
    hints: [{ type: String }],
    points: { type: Number, default: 10 },
    solvedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CodingProblem: Model<ICodingProblemDocument> =
  mongoose.models.CodingProblem ||
  mongoose.model<ICodingProblemDocument>("CodingProblem", CodingProblemSchema);
