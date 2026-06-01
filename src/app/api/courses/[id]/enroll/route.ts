import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { Enrollment } from "@/models/Enrollment";
import { getAuthUser, requireRole } from "@/lib/auth";

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
    await connectDB();

    const course = await Course.findById(id);
    if (!course || !course.isPublished) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const existing = await Enrollment.findOne({ student: user!.userId, course: id });
    if (existing) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 409 });
    }

    const enrollment = await Enrollment.create({
      student: user!.userId,
      course: id,
    });

    await Course.findByIdAndUpdate(id, { $inc: { enrolledCount: 1 } });

    return NextResponse.json({ enrollment }, { status: 201 });
  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
