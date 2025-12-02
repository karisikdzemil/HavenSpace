import { useState } from "react";

export default function Answer({ question, answer }) {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      onClick={() => setVisibility((prevVal) => !prevVal)}
      className="w-full p-3 rounded-md flex flex-col gap-3 cursor-pointer transition-all hover:bg-gray-100"
    >
      <div className="flex justify-between items-center">
        <span
          className={
            visibility
              ? "text-gray-700 text-lg"
              : "text-gray-500 font-light text-lg"
          }
        >
          {question}
        </span>{" "}
        {visibility ? (
          <span className="text-3xl text-gray-500">+</span>
        ) : (
          <span className="w-6 bg-gray-500 rounded-md h-1 "></span>
        )}
      </div>
      <div className={visibility ? "text-gray-700 font-light" : "hidden"}>
        {answer}
      </div>
    </div>
  );
}
