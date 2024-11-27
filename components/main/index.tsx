"use client";

import { useEffect, useState } from "react";
import { Comment } from "@/types/mongo";
import VoteButton from "../vote-button";

function Main() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments`);
        const result = await response.json();
        if (result.success) {
          setComments(result.comments);

          localStorage.setItem("buttonClicked", "true");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full max-w-maxContainer gap-[15px] px-[10px]">
        {comments.map(({ _id, text, rate }, index: number) => (
          <div
            className="flex justify-between w-full max-w-[600px] p-[20px] rounded-[10px] shadow-lg gap-[20px]"
            key={`EL_${index}`}
          >
            <p className="">{text}</p>

            <VoteButton rate={rate} _id={_id!} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
