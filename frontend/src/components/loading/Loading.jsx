import { useEffect, useState } from "react";

export default function Loading( {loadingText} ) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev =>
        prev.length === 3 ? "." : prev + "."
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <div className="w-22 h-22 border-4 border-[#1E1E1E] border-t-transparent rounded-full animate-spin" />
    {loadingText &&   <p className="font-bold text-2xl text-[#1E1E1E]">
        {loadingText} <span>{dots}</span>
      </p>}
    </div>
    </>
  );
}
