import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/models/Course";
import { getAuthUser, requireRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = { isPublished: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(filter)
      .populate("instructor", "name email avatar")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Courses GET error:", error);
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

    const course = await Course.create({
      ...body,
      slug: `${slug}-${Date.now().toString(36)}`,
      instructor: user!.userId,
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error("Courses POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
