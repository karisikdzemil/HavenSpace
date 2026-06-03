import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import ContentWrapper from "../../contentWrapper";
import PropertyCard from "../../propertyCard/PropertyCard";
import AuthContext from "../../../context/AuthContext";

export default function AiSearch() {
  const {
    aiMessage,
    setAiMessage,
    aiProperties,
    setAiProperties,
    aiQuery,
    setAiQuery,
    aiLoading,
    setAiLoading,
  } = useContext(AuthContext);

  const suggestions = [
    "Apartment in Novi Pazar",
    "House under €100k",
    "Property with garden",
    "Luxury villa",
  ];

  const searchHandler = async () => {
    if (!aiQuery.trim()) return;

    try {
      setAiLoading(true);

      const res = await fetch("http://localhost:8080/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: aiQuery,
          sessionId: "default",
        }),
      });

      const data = await res.json();

      setAiMessage(data.message || "");
      setAiProperties((data.properties || []).slice(0, 3));
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

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
              Tell AI what you want and it will find it instantly.
            </p>
          </div>

          {/* INPUT */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow p-6">

            <textarea
              rows="4"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Looking for apartment in Novi Pazar..."
              className="w-full resize-none border-none outline-none text-lg"
            />

            <div className="flex flex-wrap gap-3 mt-5">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setAiQuery(item)}
                  className="px-4 py-2 rounded-full bg-[#f0f7f7] text-[#327878] text-xs font-bold hover:bg-[#327878] hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={searchHandler}
              disabled={aiLoading}
              className="mt-6 w-full bg-[#327878] text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              {aiLoading ? "Searching..." : "Search With AI"}
            </button>
          </div>

          {aiMessage && (
            <div className="mt-10 p-6 rounded-3xl bg-[#f0f7f7] border border-[#dceaea]">
              <p className="text-[#327878] font-semibold">
                {aiMessage}
              </p>
            </div>
          )}

          {aiProperties.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {aiProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                />
              ))}
            </div>
          )}

        </div>
      </ContentWrapper>
    </section>
  );
}