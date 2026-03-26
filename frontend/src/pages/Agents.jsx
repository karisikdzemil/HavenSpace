import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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

  if (loading) return <div className="pt-40"><Loading loadingText="Loading our team..." /></div>;
  if (agents.length === 0) return null;

  const topAgent = agents[0];
  const expertTeam = agents.slice(1);

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 font-sans">
      <ContentWrapper>
        {/* FEATURED AGENT SECTION - EMILY STYLE */}
        <section className="flex flex-col lg:flex-row gap-16 mb-32 items-center">
          <div className="lg:w-1/2 relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={`http://localhost:8080/assets/${topAgent.avatar}`} 
                className="w-full h-[600px] object-cover"
                alt="Featured Agent"
              />
            </div>
            <div className="absolute top-6 left-6 bg-[#327878] text-white text-[10px] font-bold px-4 py-1.5 rounded-md uppercase tracking-wider">
              Top Seller
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-slate-800 mb-2">{topAgent.name} {topAgent.surname}</h1>
              <p className="text-[#327878] text-lg font-semibold">{topAgent.position || "Senior Real Estate Advisor"}</p>
            </div>

            <div className="flex gap-3">
              {["Luxury Homes", "Investment Properties", "First-Time Buyers"].map(tag => (
                <span key={tag} className="bg-[#f0f7f7] text-[#327878] text-[11px] font-bold px-4 py-2 rounded-full border border-[#e0eeee]">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-500 text-lg leading-relaxed italic border-l-4 border-[#327878]/20 pl-6">
              "{topAgent.description}"
            </p>

            <div className="flex gap-12 py-4 border-y border-gray-100">
              <div>
                <p className="text-3xl font-bold text-slate-800">{topAgent.soldProperties}+</p>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Properties Sold</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">${(topAgent.totalSales / 1000000).toFixed(0)}M</p>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Total Sales</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">5</p>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Years Experience</p>
              </div>
            </div>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-4 text-sm font-medium">
                <FontAwesomeIcon icon={faPhone} className="text-[#327878] w-4" /> {topAgent.phone}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#327878] w-4" /> {topAgent.email}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <FontAwesomeIcon icon={faLocationDot} className="text-[#327878] w-4" /> Downtown Miami Office
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex gap-3 mr-6">
                {[faLinkedinIn, faFacebookF, faInstagram, faTwitter].map((icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#327878] hover:border-[#327878] transition-all">
                    <FontAwesomeIcon icon={icon} size="sm" />
                  </button>
                ))}
              </div>
              <button className="bg-[#327878] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#286161] transition shadow-lg shadow-[#327878]/20">View My Listings</button>
              <button className="border-2 border-[#327878] text-[#327878] px-8 py-4 rounded-xl font-bold hover:bg-[#f0f7f7] transition">Schedule Consultation</button>
            </div>
          </div>
        </section>

        {/* EXPERT TEAM GRID */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Our Expert Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Meet our dedicated professionals who are committed to helping you find your perfect home or sell your property at the best value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertTeam.map((agent) => (
              <div key={agent._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
                <div className="h-80 overflow-hidden relative">
                  <img src={`http://localhost:8080/assets/${agent.avatar}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Agent" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-[9px] font-bold px-3 py-1 rounded uppercase tracking-tighter shadow-lg">Verified</div>
                </div>
                
                <div className="p-8 space-y-5">
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-1">{agent.name} {agent.surname}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{agent.position || "Property Consultant"}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 text-gray-400 text-xs font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faLocationDot} className="text-[10px]" /> Brooklyn Heights
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 pt-2">
                    {["English", "Mandarin"].map(lang => (
                      <span key={lang} className="text-[10px] bg-[#f9fbfb] border border-[#f0f3f3] text-gray-500 px-3 py-1 rounded font-bold uppercase">{lang}</span>
                    ))}
                  </div>

                  <button className="w-full mt-4 border border-[#327878] text-[#327878] py-3 rounded-xl font-bold text-sm hover:bg-[#327878] hover:text-white transition-all duration-300">
                    View Listings
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ContentWrapper>
    </main>
  );
}