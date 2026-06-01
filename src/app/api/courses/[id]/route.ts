import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { Enrollment } from "@/models/Enrollment";
import { getAuthUser, requireRole } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const course = await Course.findById(id)
      .populate("instructor", "name email avatar bio")
      .lean();

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const user = await getAuthUser();
    let enrollment = null;

    if (user) {
      enrollment = await Enrollment.findOne({
        student: user.userId,
        course: id,
      }).lean();
    }

    return NextResponse.json({ course, enrollment });
  } catch (error) {
    console.error("Course GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["instructor", "admin"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (course.instructor.toString() !== user!.userId && user!.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    Object.assign(course, body);
    await course.save();

    return NextResponse.json({ course });
  } catch (error) {
    console.error("Course PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["instructor", "admin"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    const { id } = await params;
    await connectDB();

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (course.instructor.toString() !== user!.userId && user!.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Course.findByIdAndDelete(id);
    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    console.error("Course DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
