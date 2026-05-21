import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../contentWrapper";

export default function AgentsSection() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/agents");
        const data = await res.json();
        
        if (data.agents) {
          setAgents(data.agents.slice(0, 3));
        }
      } catch (err) {
        console.error("Greška pri povlačenju agenata za Home sekciju:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-sm font-bold uppercase tracking-widest text-slate-400">
        Loading Featured Agents...
      </div>
    );
  }

  if (agents.length === 0) return null;

  return (
    <section className="bg-white mx-auto font-sans">
        <ContentWrapper>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 relative inline-block pb-4 tracking-tight">
          Featured Agents
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-[#327878]"></span>
        </h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm font-medium tracking-wide">
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {agents.map((agent) => {
          const badgeText = agent.isTopAgent ? "TOP AGENT" : "CERTIFIED";

          return (
            <div 
              key={agent._id} 
              className="bg-white rounded-4xl overflow-hidden shadow-[0_15px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-80 w-full bg-slate-50 overflow-hidden">
                <img 
                  src={`http://localhost:8080/assets/${agent.avatar}`} 
                  alt={`${agent.name} ${agent.surname}`} 
                  className="w-full h-full object-cover object-center"
                />
                <span className={`absolute top-5 right-5 text-[10px] font-black px-3.5 py-2 rounded-lg text-white tracking-widest ${
                  agent.isTopAgent ? "bg-[#f1c40f]" : "bg-[#117a8b]"
                }`}>
                  {badgeText}
                </span>
              </div>

              <div className="p-8 flex-1 flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  {agent.name} {agent.surname}
                </h3>
                <p className="text-[11px] font-black text-[#327878] tracking-widest mt-1.5 mb-5 uppercase">
                  {agent.position}
                </p>

                <div className="w-full bg-[#f8fafc] rounded-2xl p-4 flex items-center justify-around border border-slate-100 mb-5">
                  <div className="text-center">
                    <span className="block text-xl font-black text-slate-900">
                      {agent.soldProperties || 0}+
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">
                      {agent.position?.toLowerCase().includes("commercial") ? "Commercial Sales" : "Properties Sold"}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-center">
                    <span className="block text-xl font-black text-slate-900">
                      {agent.isTopAgent ? "4.9" : "4.8"}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">
                      Rating
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-5 uppercase tracking-wide">
                  <FontAwesomeIcon icon={faLocationDot} className="text-slate-400" />
                  {agent.location}
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <span className="text-[10px] font-black text-[#327878] border border-slate-200 px-3 py-1.5 rounded-full tracking-wider uppercase">
                    {agent.position?.split(' ')[0] || "Agent"}
                  </span>
                  <span className="text-[10px] font-black text-[#327878] border border-slate-200 px-3 py-1.5 rounded-full tracking-wider uppercase">
                    {agent.location?.split(' ')[0] || "Waterfront"}
                  </span>
                </div>

                <a 
                  href={`/agents/${agent._id}`}
                  className="w-full mt-auto bg-[#327878] hover:bg-[#286161] text-white text-center font-bold py-4 px-4 rounded-xl transition-all duration-200 text-xs uppercase tracking-widest shadow-md shadow-[#327878]/10"
                >
                  View Full Profile
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <a 
          href="/agents"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#327878] text-[#327878] font-bold rounded-full hover:bg-[#327878] hover:text-white transition-all duration-300 text-xs uppercase tracking-widest"
        >
          Explore All Our Agents
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </a>
      </div>
</ContentWrapper>
    </section>
  );
}