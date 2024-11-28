"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { localStoreName } from "@/lib/consts";

interface VoteButtonProps {
  _id: ObjectId;
  rate: number;
}

function VoteButton({ _id, rate }: VoteButtonProps) {
  const [currentRate, setCurrentRate] = useState<number>(rate);
  const handleClick = async (id: ObjectId, increment: number) => {
    const localData = localStorage.getItem(localStoreName);
    let votedComments = [];
    if (localData) {
      votedComments = JSON.parse(localData);
    }
    if (votedComments.includes(id)) return;

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
        localStorage.setItem(
          localStoreName,
          JSON.stringify([...votedComments, id])
        );

        setCurrentRate((prev) => prev + increment);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  function formatVotes(votes: number): string {
    if (votes >= 1_000_000_000) {
      return `${(votes / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
    }
    if (votes >= 1_000_000) {
      return `${(votes / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (votes >= 1_000) {
      return `${(votes / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return votes.toString();
  }

  return (
    <Button
      onClick={() => handleClick(_id, 1)}
      className="p-[25px]"
      variant="outline"
      size="icon"
    >
      <div className="flex flex-col items-center p-[10px]">
        <ChevronUp />
        <span className="">{formatVotes(currentRate)}</span>
      </div>
    </Button>
  );
}

export default VoteButton;
