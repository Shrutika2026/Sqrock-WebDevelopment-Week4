import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
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

    const certificates = await Certificate.find({ student: user!.userId })
      .populate("course", "title thumbnail category")
      .populate("student", "name email")
      .sort({ issuedAt: -1 })
      .lean();

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Certificates GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
