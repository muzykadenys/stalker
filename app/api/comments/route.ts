import { NextRequest, NextResponse } from "next/server";
import { CommentModel } from "@/lib/models/comment";
import { Comment } from "@/types/mongo";

export async function POST(req: NextRequest) {
  try {
    const data: Omit<Comment, "_id"> = await req.json();

    // Validate required fields
    if (!data.text || !data.rate) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    const comment = await CommentModel.create(data);

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to save comment",
    });
  }
}

export async function GET() {
  try {
    const comments = await CommentModel.getAll();

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch all comments",
    });
  }
}
