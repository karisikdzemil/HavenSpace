import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import ContentWrapper from "../../contentWrapper";
import PropertyCard from "../../propertyCard/PropertyCard";

export default function AiSearch() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [aiMessage, setAiMessage] = useState("");
  const [properties, setProperties] = useState([]);

  const searchHandler = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          sessionId: "default",
        }),
      });

      const data = await res.json();

      setAiMessage(data.message || "");
      setProperties((data.properties || []).slice(0, 3)); // 👈 samo 3 kartice
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Apartment in Novi Pazar",
    "House under €100k",
    "Property with garden",
    "Luxury villa",
  ];

  return (
    <section className="bg-[#FBFCFC] py-24">
      <ContentWrapper>
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
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
              Tell our AI exactly what you're looking for and get instant recommendations.
            </p>
          </div>

          {/* SEARCH BOX */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] p-6">

            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Looking for a modern apartment in Novi Pazar under €80,000..."
              className="w-full resize-none border-none outline-none text-lg text-slate-700 placeholder:text-slate-300"
            />

            {/* SUGGESTIONS */}
            <div className="flex flex-wrap gap-3 mt-5">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setMessage(item)}
                  className="px-4 py-2 rounded-full bg-[#f0f7f7] text-[#327878] text-xs font-bold hover:bg-[#327878] hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={searchHandler}
              disabled={loading}
              className="mt-6 w-full cursor-pointer bg-[#327878] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#286161] transition-all flex items-center justify-center gap-3"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              {loading ? "Searching..." : "Search With AI"}
            </button>
          </div>

          {/* AI RESPONSE */}
          {aiMessage && (
            <div className="mt-10 p-6 rounded-3xl bg-[#f0f7f7] border border-[#dceaea]">
              <p className="text-[#327878] font-semibold">
                {aiMessage}
              </p>
            </div>
          )}

          {/* RESULTS */}
          {properties.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black text-slate-900">
                  AI Recommendations
                </h3>

                <span className="text-slate-400 font-medium">
                  Showing top {properties.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </ContentWrapper>
    </section>
  );
}