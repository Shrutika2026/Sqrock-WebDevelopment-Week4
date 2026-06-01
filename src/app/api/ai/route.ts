import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { askAI, getCodingHint } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, context, type, problemTitle, code, language } = await req.json();

    let response: string;

    if (type === "hint" && problemTitle) {
      response = await getCodingHint(problemTitle, code || "", language || "javascript");
    } else {
      response = await askAI(message, context);
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 });
  }
}
