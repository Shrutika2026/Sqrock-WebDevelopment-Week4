export type UserRole = "student" | "instructor" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface ILesson {
  _id?: string;
  title: string;
  type: "video" | "notes" | "quiz" | "coding";
  videoUrl?: string;
  content?: string;
  duration?: number;
  order: number;
  quizId?: string;
  codingProblemId?: string;
}

export interface IModule {
  _id?: string;
  title: string;
  description?: string;
  lessons: ILesson[];
  order: number;
}

export interface ICourse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  instructor: IUser | string;
  modules: IModule[];
  tags: string[];
  isPublished: boolean;
  enrolledCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface ICodingProblem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  testCases: ITestCase[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  hints: string[];
  points: number;
  solvedCount: number;
}

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface IQuiz {
  _id: string;
  title: string;
  description?: string;
  courseId?: string;
  questions: IQuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  totalPoints: number;
}

export interface IEnrollment {
  _id: string;
  student: string;
  course: ICourse | string;
  progress: number;
  completedLessons: string[];
  quizScores: { quizId: string; score: number; passed: boolean }[];
  enrolledAt: string;
  completedAt?: string;
}

export interface ICertificate {
  _id: string;
  student: string;
  course: ICourse | string;
  certificateId: string;
  issuedAt: string;
  grade: string;
}

export interface ISubmission {
  _id: string;
  student: string;
  problem: string;
  code: string;
  language: string;
  status: "accepted" | "wrong_answer" | "runtime_error" | "pending";
  testResults: { passed: boolean; input: string; expected: string; actual: string }[];
  score: number;
  submittedAt: string;
}

export interface IDashboardStats {
  enrolledCourses: number;
  completedCourses: number;
  codingProblemsSolved: number;
  averageQuizScore: number;
  certificatesEarned: number;
  totalProgress: number;
}
