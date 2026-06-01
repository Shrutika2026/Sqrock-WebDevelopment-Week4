import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { CodingProblem } from "../models/CodingProblem";
import { Quiz } from "../models/Quiz";
import { generate50Courses } from "./data/generateCourses";
import { CODING_PROBLEMS } from "./data/codingProblems";
import { generateOnlineTests } from "./data/onlineTests";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (existsSync(envPath)) {
    readFileSync(envPath, "utf-8")
      .split("\n")
      .forEach((line) => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match && !process.env[match[1].trim()]) {
          process.env[match[1].trim()] = match[2].trim();
        }
      });
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codelearn-lms";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    CodingProblem.deleteMany({}),
    Quiz.deleteMany({}),
  ]);

  const hashedPassword = await bcrypt.hash("password123", 12);

  const [instructor, student] = await User.create([
    {
      name: "Dr. Sarah Johnson",
      email: "instructor@codelearn.com",
      password: hashedPassword,
      role: "instructor",
      bio: "Senior Software Engineer with 10+ years of experience in full-stack development.",
    },
    {
      name: "Alex Student",
      email: "student@codelearn.com",
      password: hashedPassword,
      role: "student",
    },
  ]);

  console.log("Created users");

  const courseData = generate50Courses(instructor._id);
  const courses = await Course.create(courseData);
  console.log(`Created ${courses.length} courses`);

  const emptyStarter = () => ({
    javascript: `function solution(...args) {\n  // Write your code here\n\n}`,
    python: `# Write your code here\ndef solution(*args):\n    pass`,
    java: `// Write your code here\npublic class Solution {\n    public Object solution(Object... args) {\n        return null;\n    }\n}`,
    cpp: `// Write your code here\n`,
  });

  const problemsWithCounts = CODING_PROBLEMS.map((p) => ({
    ...p,
    starterCode: emptyStarter(),
    solvedCount: 200 + Math.floor(Math.random() * 2000),
  }));
  const problems = await CodingProblem.create(problemsWithCounts);
  console.log(`Created ${problems.length} coding problems`);

  const tests = generateOnlineTests();
  const quizzes = await Quiz.create(tests);
  console.log(`Created ${quizzes.length} online tests`);

  console.log("\n--- Seed Complete ---");
  console.log("Demo Accounts:");
  console.log("  Instructor: instructor@codelearn.com / password123");
  console.log("  Student:    student@codelearn.com / password123");
  console.log(`\nContent: ${courses.length} courses | ${problems.length} coding problems | ${quizzes.length} online tests`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
