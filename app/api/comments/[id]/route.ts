import { NextRequest, NextResponse } from "next/server";
import { CommentModel } from "@/lib/models/comment";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    "shit";

  console.log(ip);

  const { id } = params;
  try {
    const { increment } = await req.json(); // `increment` can be positive or negative
    if (typeof increment !== "number") {
      return NextResponse.json(
        { success: false, error: "Invalid increment value" },
        { status: 400 }
      );
    }

    const updatedComment = await CommentModel.updateRate(id, increment);
    if (!updatedComment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, updatedComment });
  } catch (error) {
    console.error("Error updating rate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update rate" },
      { status: 500 }
    );
  }
}
