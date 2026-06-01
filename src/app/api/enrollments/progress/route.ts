import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enrollment } from "@/models/Enrollment";
import { Course } from "@/models/Course";
import { Certificate } from "@/models/Certificate";
import { getAuthUser, requireRole } from "@/lib/auth";
import { generateCertificateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["student"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    const { lessonId, courseId } = await req.json();

    if (!lessonId || !courseId) {
      return NextResponse.json({ error: "lessonId and courseId required" }, { status: 400 });
    }

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const enrollment = await Enrollment.findOne({
      student: user!.userId,
      course: courseId,
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    const totalLessons = course.modules.reduce(
      (acc, mod) => acc + (mod.lessons?.length || 0),
      0
    );
    const completed = enrollment.completedLessons.length;
    enrollment.progress = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

    if (enrollment.progress >= 100 && !enrollment.completedAt) {
      enrollment.completedAt = new Date();

      const existingCert = await Certificate.findOne({
        student: user!.userId,
        course: courseId,
      });

      if (!existingCert) {
        await Certificate.create({
          student: user!.userId,
          course: courseId,
          certificateId: generateCertificateId(),
          grade: enrollment.progress >= 90 ? "A+" : enrollment.progress >= 80 ? "A" : "B",
        });
      }
    }

    await enrollment.save();

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
