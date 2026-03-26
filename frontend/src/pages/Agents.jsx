import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, faPhone, faLocationDot, faGlobe, faCertificate, 
  faArrowRight, faBriefcase, faCalendarCheck, faUserCheck, faAward
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import ContentWrapper from "../components/contentWrapper";
import Loading from "../components/loading/Loading";

export default function Agents() {
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/agents");
        const data = await res.json();
        setAgents(data.agents);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchAgents();
  }, []);

  if (loading) return <div className="pt-40"><Loading loadingText="Refining the team..." /></div>;
  if (agents.length === 0) return null;

  const topAgent = agents.find(a => a.isTopAgent) || agents[0];
  const expertTeam = agents.filter(a => a._id !== topAgent._id);

  return (
    <main className="bg-[#FBFCFC] min-h-screen pt-32 pb-24 font-sans text-slate-800">
      <ContentWrapper>
        
        {/* PREMIUM COMPACT HERO - CLEAN & INFO RICH */}
        <section className="relative mb-24 overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.05)] h-[420px] flex items-center">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-[#f0f7f7] skew-x-[-10deg] translate-x-16" />
          
          <div className="relative z-10 px-12 lg:px-20 flex items-center gap-16 w-full">
            <div className="hidden lg:block w-72 h-72 rounded-3xl overflow-hidden shadow-2xl ring-8 ring-[#f0f7f7]">
              <img 
                src={`http://localhost:8080/assets/${topAgent.avatar}`} 
                className="w-full h-full object-cover"
                alt={topAgent.name}
              />
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#327878] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                <FontAwesomeIcon icon={faAward} /> Lead Specialist
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2 tracking-tight">
                {topAgent.name} <span className="text-[#327878]">{topAgent.surname}</span>
              </h1>
              <p className="text-[#327878] text-sm font-bold uppercase tracking-widest mb-8">{topAgent.position}</p>
              
              <div className="grid grid-cols-4 gap-8 mb-8 border-l-2 border-gray-100 pl-8">
                <div>
                  <p className="text-xl font-black text-slate-900">{topAgent.soldProperties}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Deals Closed</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900">${(topAgent.totalSales / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Volume</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900">10+</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Years Exp.</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900">99%</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Rating</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="bg-[#327878] text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#286161] transition-all shadow-lg shadow-[#327878]/20">
                  Contact Now
                </button>
                <div className="flex gap-3 ml-4">
                   {topAgent.linkedin && (
                     <a href={topAgent.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#327878] transition-all">
                       <FontAwesomeIcon icon={faLinkedinIn} size="sm" />
                     </a>
                   )}
                   <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#327878] cursor-pointer transition-all">
                      <FontAwesomeIcon icon={faInstagram} size="sm" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between mb-16 px-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">The Collective</h2>
            <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest">Our Top Performing Agents</p>
          </div>
          <div className="flex gap-2">
            <span className="w-12 h-1.5 rounded-full bg-[#327878]" />
            <span className="w-4 h-1.5 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertTeam.map((agent) => (
            <div key={agent._id} className="group bg-white rounded-[2rem] border border-gray-100 p-4 transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] hover:border-[#327878]/30">
              <div className="h-64 relative overflow-hidden rounded-[1.5rem] mb-6 shadow-inner bg-gray-50">
                <img 
                  src={`http://localhost:8080/assets/${agent.avatar}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={agent.name} 
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-[#327878] uppercase">
                   <FontAwesomeIcon icon={faUserCheck} className="mr-1" /> Verified
                </div>
              </div>
              
              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#327878] transition-colors">
                      {agent.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1">
                      {agent.position?.split(' ')[0] || "Advisor"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">${(agent.totalSales / 1000).toFixed(0)}k</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase leading-none">Sales</p>
                  </div>
                </div>

                <div className="space-y-3 py-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#327878] w-3" /> {agent.location}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                    <FontAwesomeIcon icon={faGlobe} className="text-[#327878] w-3" /> {agent.languages?.join(', ') || 'English'}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                    <FontAwesomeIcon icon={faBriefcase} className="text-[#327878] w-3" /> {agent.soldProperties} Sold
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                  <a 
                    href={`/agents/${agent._id}`}
                    className="flex-1 bg-slate-900 text-white text-center py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#327878] transition-all"
                  >
                    Details
                  </a>
                  <a 
                    href={`tel:${agent.phone}`}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#f0f7f7] text-[#327878] hover:bg-[#327878] hover:text-white transition-all"
                  >
                    <FontAwesomeIcon icon={faPhone} size="sm" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </main>
  );
}