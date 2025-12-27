import { useState } from "react";

export default function Loading() {

    const [dots, setDots] = useState('.');

  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <div className="w-22 h-22 border-4 border-[#1E1E1E] border-t-transparent rounded-full animate-spin" />
      <p className="text-bold text-2xl text-[#1E1E1E]">
        Loading elements 
        <span> {} </span>
      </p>
    </div>
  );
}
