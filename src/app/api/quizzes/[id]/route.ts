import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { Enrollment } from "@/models/Enrollment";
import { getAuthUser, requireRole } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const quiz = await Quiz.findById(id).lean();
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const safeQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        question: q.question,
        options: q.options,
      })),
    };

    return NextResponse.json({ quiz: safeQuiz });
  } catch (error) {
    console.error("Quiz GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["student"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    const { id } = await params;
    const { answers, courseId } = await req.json();

    await connectDB();

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    let correct = 0;
    const results = quiz.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        question: q.question,
        correct: isCorrect,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    if (courseId) {
      const enrollment = await Enrollment.findOne({
        student: user!.userId,
        course: courseId,
      });

      if (enrollment) {
        enrollment.quizScores.push({
          quizId: quiz._id,
          score,
          passed,
        });
        await enrollment.save();
      }
    }

    return NextResponse.json({ score, passed, results, totalQuestions: quiz.questions.length });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
