import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { Enrollment } from "@/models/Enrollment";
import { getAuthUser, requireRole } from "@/lib/auth";
import { generateQuiz } from "@/lib/ai";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const category = searchParams.get("category");
    const level = searchParams.get("level");

    const filter: Record<string, unknown> = {};
    if (courseId) filter.courseId = courseId;
    if (category) filter.category = category;
    if (level) filter.level = level;

    const quizzes = await Quiz.find(filter)
      .select("-questions.correctAnswer -questions.explanation")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error("Quizzes GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["instructor", "admin"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    const body = await req.json();
    await connectDB();

    let questions = body.questions;

    if (body.generateWithAI && body.topic) {
      questions = await generateQuiz(body.topic, body.questionCount || 5);
    }

    const quiz = await Quiz.create({
      title: body.title,
      description: body.description,
      courseId: body.courseId,
      questions,
      timeLimit: body.timeLimit,
      passingScore: body.passingScore || 60,
      totalPoints: questions.length * 20,
    });

    return NextResponse.json({ quiz }, { status: 201 });
  } catch (error) {
    console.error("Quizzes POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
