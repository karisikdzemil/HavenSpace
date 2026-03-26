import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, faPhone, faLocationDot, faGlobe, faAward, 
  faCheckDouble, faChartLine, faCalendarDays, faShareNodes 
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import ContentWrapper from "../components/contentWrapper";
import PropertyCard from "../components/propertyCard/PropertyCard";
import Loading from "../components/loading/Loading";

export default function AgentProfile() {
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getAgent = async () => {
      setLoading(true);
      try {
        const result = await fetch(`http://localhost:8080/api/get-user/${id}`);
        if (!result.ok) throw new Error("Something went wrong!");

        const data = await result.json();
        setAgent(data.user);

        if (data && data.user._id) {
          const res = await fetch(`http://localhost:8080/api/user-properties/${data.user._id}`);
          if (res.ok) {
            const userProperties = await res.json();
            setProperties(userProperties.properties);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAgent();
  }, [id]);

  if (loading) return <div className="pt-40"><Loading loadingText="Loading profile details..." /></div>;
  if (!agent) return <div className="pt-40 text-center">Agent not found.</div>;

  return (
    <main className="bg-[#FBFCFC] min-h-screen pt-12 pb-24">
      <ContentWrapper>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-12">
          <a href="/agents" className="hover:text-[#327878] transition-colors">Agents</a>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[#327878]">{agent.name} {agent.surname}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          
          <div className="w-full lg:w-[400px] lg:sticky lg:top-32">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
              <div className="relative mb-8">
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src={`http://localhost:8080/assets/${agent.avatar}`}
                    alt={`${agent.name} ${agent.surname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 right-8 bg-[#327878] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                  <FontAwesomeIcon icon={faAward} />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-1 leading-tight">
                  {agent.name} {agent.surname}
                </h1>
                <p className="text-[#327878] text-[10px] font-black uppercase tracking-[0.2em]">
                  {agent.position}
                </p>
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-50">
                <a href={`mailto:${agent.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9fbfb] hover:bg-[#327878] hover:text-white transition-all group">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[#327878] group-hover:text-white" />
                  <span className="text-xs font-bold truncate">{agent.email}</span>
                </a>
                <a href={`tel:${agent.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9fbfb] hover:bg-[#327878] hover:text-white transition-all group">
                  <FontAwesomeIcon icon={faPhone} className="text-[#327878] group-hover:text-white" />
                  <span className="text-xs font-bold">{agent.phone}</span>
                </a>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                {[
                  { icon: faLinkedinIn, url: agent.linkedin },
                  { icon: faInstagram, url: agent.instagram },
                  { icon: faFacebookF, url: agent.facebook }
                ].map((social, i) => social.url && (
                  <a key={i} href={social.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#327878] hover:border-[#327878] transition-all">
                    <FontAwesomeIcon icon={social.icon} size="sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-16">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Properties Sold', value: agent.soldProperties, icon: faCheckDouble },
                { label: 'Total Sales', value: `€${(agent.totalSales / 1000).toFixed(0)}k`, icon: faChartLine },
                { label: 'Active Listings', value: properties.length, icon: faCalendarDays },
                { label: 'Experience', value: '8+ Years', icon: faAward },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
                  <div className="text-[#327878] mb-3 opacity-30"><FontAwesomeIcon icon={stat.icon} /></div>
                  <p className="text-2xl font-black text-slate-900 leading-none mb-2">{stat.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-4">
                About the Agent
                <div className="h-px flex-1 bg-gray-100" />
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                {agent.description}
              </p>
              
              <div className="flex flex-wrap gap-10 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Service Area</p>
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#327878]" /> {agent.location}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Languages</p>
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <FontAwesomeIcon icon={faGlobe} className="text-[#327878]" /> {agent.languages.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Active Listings</h2>
                <p className="text-xs font-bold text-[#327878] uppercase tracking-widest">{properties.length} Results Found</p>
              </div>

              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {properties.map(el => (
                    <PropertyCard key={el._id} property={el}/>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                  <p className="text-gray-400 font-medium">This agent currently has no active listings.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </ContentWrapper>
    </main>
  );
}