import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enrollment } from "@/models/Enrollment";
import { Submission } from "@/models/Submission";
import { Certificate } from "@/models/Certificate";
import { getAuthUser, requireRole } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    const roleCheck = requireRole(user, ["student"]);
    if (roleCheck) {
      return NextResponse.json({ error: roleCheck.error }, { status: roleCheck.status });
    }

    await connectDB();

    const [enrollments, submissions, certificates] = await Promise.all([
      Enrollment.find({ student: user!.userId }).populate("course", "title thumbnail").lean(),
      Submission.find({ student: user!.userId, status: "accepted" }).lean(),
      Certificate.find({ student: user!.userId }).populate("course", "title").lean(),
    ]);

    const completedCourses = enrollments.filter((e) => e.progress >= 100).length;
    const avgQuizScore =
      enrollments.reduce((acc, e) => {
        const scores = e.quizScores.map((q) => q.score);
        return acc + (scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0);
      }, 0) / (enrollments.length || 1);

    const totalProgress =
      enrollments.reduce((acc, e) => acc + e.progress, 0) / (enrollments.length || 1);

    const stats = {
      enrolledCourses: enrollments.length,
      completedCourses,
      codingProblemsSolved: submissions.length,
      averageQuizScore: Math.round(avgQuizScore),
      certificatesEarned: certificates.length,
      totalProgress: Math.round(totalProgress),
    };

    const progressData = enrollments.map((e) => {
      const course = e.course as unknown as { title: string };
      return {
        course: course?.title || "Unknown",
        progress: e.progress,
      };
    });

    return NextResponse.json({ stats, progressData, certificates, recentSubmissions: submissions.slice(0, 5) });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
