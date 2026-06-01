import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CodingProblem } from "@/models/CodingProblem";
import { Submission } from "@/models/Submission";
import { getAuthUser, requireRole } from "@/lib/auth";
import { executeCode } from "@/lib/codeRunner";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get("difficulty");
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const problems = await CodingProblem.find(filter).sort({ difficulty: 1 }).lean();
    return NextResponse.json({ problems });
  } catch (error) {
    console.error("Problems GET error:", error);
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

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const problem = await CodingProblem.create({
      ...body,
      slug: `${slug}-${Date.now().toString(36)}`,
    });

    return NextResponse.json({ problem }, { status: 201 });
  } catch (error) {
    console.error("Problems POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
