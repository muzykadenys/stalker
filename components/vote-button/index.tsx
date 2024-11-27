"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { ObjectId } from "mongodb";
import { useState } from "react";

interface VoteButtonProps {
  _id: ObjectId;
  rate: number;
}

function VoteButton({ _id, rate }: VoteButtonProps) {
  const [currentRate, setCurrentRate] = useState<number>(rate);
  const handleClick = async (id: ObjectId, increment: number) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment }),
      });

      const result = await response.json();
      if (result.success) {
        // console.log("Updated comment:", result.updatedComment);
        setCurrentRate((prev) => prev + increment);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <Button
      onClick={() => handleClick(_id, 1)}
      className="p-[25px]"
      variant="outline"
      size="icon"
    >
      <div className="flex flex-col items-center p-[10px]">
        <ChevronUp />
        <span className="">{currentRate}</span>
      </div>
    </Button>
  );
}

export default VoteButton;
