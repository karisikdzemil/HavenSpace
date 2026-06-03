import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandSparkles, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../../contentWrapper";

export default function AiSearch() {
  const [message, setMessage] = useState("");

  return (
    <section className="bg-[#FBFCFC] py-24">
      <ContentWrapper>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">

            <div className="inline-flex items-center gap-2 bg-[#327878] text-white px-5 py-2 rounded-full mb-6">
              <FontAwesomeIcon icon={faHandSparkles} />
              <span className="text-xs font-black uppercase tracking-widest">
                AI Property Finder
              </span>
            </div>

            <h2 className="text-5xl font-black text-slate-900 mb-4">
              Describe Your Dream Property
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto">
              Tell our AI exactly what you're looking for and receive
              personalized property recommendations instantly.
            </p>

          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] p-6">

            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Looking for a modern apartment in Novi Pazar under €80,000 with 3 bedrooms..."
              className="w-full resize-none border-none outline-none text-lg text-slate-700 placeholder:text-slate-300"
            />

            <div className="flex flex-wrap gap-3 mt-5">

              {[
                "Apartment in Novi Pazar",
                "House under €100k",
                "Property with garden",
                "Luxury villa",
              ].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 rounded-full bg-[#f0f7f7] text-[#327878] text-xs font-bold hover:bg-[#327878] hover:text-white transition"
                >
                  {item}
                </button>
              ))}

            </div>

            <button className="mt-6 w-full cursor-pointer bg-[#327878] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#286161] transition-all flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faPaperPlane} />
              Search With AI
            </button>

          </div>

        </div>
      </ContentWrapper>
    </section>
  );
}