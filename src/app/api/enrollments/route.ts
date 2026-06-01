import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enrollment } from "@/models/Enrollment";
import { getAuthUser, requireRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["student"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    await connectDB();

    const enrollments = await Enrollment.find({ student: user!.userId })
      .populate({
        path: "course",
        populate: { path: "instructor", select: "name" },
      })
      .sort({ enrolledAt: -1 })
      .lean();

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error("Enrollments GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
