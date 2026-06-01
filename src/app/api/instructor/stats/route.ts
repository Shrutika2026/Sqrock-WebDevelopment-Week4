import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { Enrollment } from "@/models/Enrollment";
import { Certificate } from "@/models/Certificate";
import { getAuthUser, requireRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["instructor", "admin"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    await connectDB();

    const courses = await Course.find({ instructor: user!.userId }).lean();
    const courseIds = courses.map((c) => c._id);

    const enrollments = await Enrollment.find({ course: { $in: courseIds } })
      .populate("student", "name email")
      .populate("course", "title")
      .lean();

    const totalStudents = new Set(enrollments.map((e) => e.student.toString())).size;
    const totalEnrollments = enrollments.length;
    const avgProgress =
      enrollments.reduce((acc, e) => acc + e.progress, 0) / (enrollments.length || 1);

    const courseStats = courses.map((course) => {
      const courseEnrollments = enrollments.filter(
        (e) => e.course.toString() === course._id.toString()
      );
      return {
        courseId: course._id,
        title: course.title,
        enrolled: courseEnrollments.length,
        avgProgress: courseEnrollments.length
          ? Math.round(
              courseEnrollments.reduce((acc, e) => acc + e.progress, 0) /
                courseEnrollments.length
            )
          : 0,
        isPublished: course.isPublished,
      };
    });

    return NextResponse.json({
      stats: {
        totalCourses: courses.length,
        publishedCourses: courses.filter((c) => c.isPublished).length,
        totalStudents,
        totalEnrollments,
        avgProgress: Math.round(avgProgress),
      },
      courseStats,
      recentEnrollments: enrollments.slice(0, 10),
    });
  } catch (error) {
    console.error("Instructor stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
