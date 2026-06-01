import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CodingProblem } from "@/models/CodingProblem";
import { Submission } from "@/models/Submission";
import { getAuthUser, requireRole } from "@/lib/auth";
import { executeCode } from "@/lib/codeRunner";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const problem = await CodingProblem.findById(id).lean();
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    const visibleProblem = {
      ...problem,
      testCases: problem.testCases.filter((tc) => !tc.isHidden),
    };

    return NextResponse.json({ problem: visibleProblem });
  } catch (error) {
    console.error("Problem GET error:", error);
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
    const { code, language } = await req.json();

    await connectDB();

    const problem = await CodingProblem.findById(id);
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    const result = executeCode(code, language, problem.testCases);

    const submission = await Submission.create({
      student: user!.userId,
      problem: id,
      code,
      language,
      status: result.status,
      testResults: result.results,
      score: result.score,
    });

    if (result.status === "accepted") {
      await CodingProblem.findByIdAndUpdate(id, { $inc: { solvedCount: 1 } });
    }

    return NextResponse.json({
      submission,
      results: result.results.map((r) => ({
        passed: r.passed,
        input: r.input,
        expected: r.expected,
        actual: r.actual,
        error: r.error,
      })),
      status: result.status,
      score: result.score,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
