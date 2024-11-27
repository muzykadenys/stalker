import { NextRequest, NextResponse } from "next/server";
import { CommentModel } from "@/lib/models/comment";
import { localStoreName } from "@/lib/consts";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const localData = localStorage.getItem(localStoreName);
  let votedComments = [];
  if (localData) {
    votedComments = JSON.parse(localData);
  }
  if (votedComments.includes(id)) {
    return NextResponse.json(
      { success: false, error: "Already commented" },
      { status: 404 }
    );
  }

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

    localStorage.setItem(
      localStoreName,
      JSON.stringify([...votedComments, id])
    );

    return NextResponse.json({ success: true, updatedComment });
  } catch (error) {
    console.error("Error updating rate:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update rate" },
      { status: 500 }
    );
  }
}
