import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLocationDot, faPhone, faEnvelope, faTrash, faEdit, 
  faCheckCircle, faBed, faBath, faMaximize, faWarehouse,
  faCalendarDays, faCheck, faShieldHeart, faTree, faBolt, faWater,
  faShareNodes, faPrint, faHeart
} from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../components/contentWrapper";
import Loading from "../components/loading/Loading";
import { useAuth } from "../hooks/useAuth";

export default function Propertie() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const { token, user, refreshUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProperty = async () => {
      try {
        setLoading(true);
        const result = await fetch(`http://localhost:8080/api/property/${id}`);
        const data = await result.json();
        setProperty(data.property);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    getProperty();
  }, [id]);

  if (loading) return <div className="pt-36"><Loading loadingText="Opening the doors..." /></div>;
  if (!property) return null;

  const isOwner = user && property.owner._id === user._id;

  return (
    <main className="bg-white min-h-screen pb-20 pt-24">
      <ContentWrapper>
        {/* TOP UTILS BAR */}
        <div className="flex justify-between items-center mb-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-[#327878] transition">Properties</Link>
            <span>/</span>
            <span className="text-gray-900">{property.type} in {property.location.city}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 transition"><FontAwesomeIcon icon={faHeart} /></button>
            <button className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-[#327878] hover:bg-gray-50 transition"><FontAwesomeIcon icon={faShareNodes} /></button>
            <button className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-gray-900 transition"><FontAwesomeIcon icon={faPrint} /></button>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1 max-w-[850px]">
            {/* GALLERY GRID */}
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-10">
              <div className="col-span-3 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group">
                <img src={`http://localhost:8080/${property.images[0]}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest text-[#327878]">Featured</div>
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden shadow-md">
                <img src={`http://localhost:8080/${property.images[1] || property.images[0]}`} className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 relative rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                <img src={`http://localhost:8080/${property.images[2] || property.images[0]}`} className="w-full h-full object-cover brightness-50" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">+{property.images.length} Photos</div>
              </div>
            </div>

            {/* QUICK INFO BAR */}
            <div className="flex flex-wrap gap-8 py-8 border-y border-gray-100 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#327878]"><FontAwesomeIcon icon={faBed} /></div>
                <div><p className="text-sm font-bold">{property.bedNum}</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Bedrooms</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#327878]"><FontAwesomeIcon icon={faBath} /></div>
                <div><p className="text-sm font-bold">{property.bathNum}</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Bathrooms</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#327878]"><FontAwesomeIcon icon={faMaximize} /></div>
                <div><p className="text-sm font-bold">{property.area} m²</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Living Area</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#327878]"><FontAwesomeIcon icon={faWarehouse} /></div>
                <div><p className="text-sm font-bold">{property.garage}</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Garage</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#327878]"><FontAwesomeIcon icon={faCalendarDays} /></div>
                <div><p className="text-sm font-bold">2026</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Year Built</p></div>
              </div>
            </div>

            {/* DESCRIPTION TABS */}
            <div className="mb-12">
              <div className="flex gap-8 border-b border-gray-100 mb-8">
                {["description", "features", "neighborhood"].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? "text-[#327878] border-b-2 border-[#327878]" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="animate-fadeIn">
                {activeTab === "description" && (
                  <div className="max-w-[700px]">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 leading-tight">Property Overview</h2>
                    <p className="text-gray-600 leading-relaxed text-base mb-6">{property.description}</p>
                    <p className="text-gray-600 leading-relaxed text-base">This meticulously maintained {property.type} offers an unparalleled living experience. Situated in the heart of {property.location.city}, the residence blends modern luxury with classic architectural elements. Every detail has been considered to ensure comfort and style for the most discerning buyer.</p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2"><FontAwesomeIcon icon={faBolt} className="text-[#327878] text-xs" /> Interior</h3>
                      <ul className="space-y-4">
                        {property.interiorFeatures?.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium group cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#327878] group-hover:scale-150 transition"></span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2"><FontAwesomeIcon icon={faTree} className="text-[#327878] text-xs" /> Exterior</h3>
                      <ul className="space-y-4">
                        {property.exteriorFeatures?.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium group cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#327878] group-hover:scale-150 transition"></span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* HIGHLIGHTS CARDS */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="p-6 rounded-2xl bg-[#f0f5f5] border border-[#dceaea]">
                <FontAwesomeIcon icon={faShieldHeart} className="text-[#327878] mb-3 text-xl" />
                <h4 className="font-bold text-sm mb-1">Safety First</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Integrated smart security systems and 24/7 monitoring active.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#f0f5f5] border border-[#dceaea]">
                <FontAwesomeIcon icon={faBolt} className="text-[#327878] mb-3 text-xl" />
                <h4 className="font-bold text-sm mb-1">Energy Efficient</h4>
                <p className="text-xs text-gray-500 leading-relaxed">A+ energy rating with solar readiness and thermal insulation.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#f0f5f5] border border-[#dceaea]">
                <FontAwesomeIcon icon={faWater} className="text-[#327878] mb-3 text-xl" />
                <h4 className="font-bold text-sm mb-1">Pure Living</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Advanced water filtration system installed throughout the home.</p>
              </div>
            </div>
          </div>

          {/* SIDEBAR STICKY */}
          <aside className="w-full lg:w-[380px]">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#327878]/5 rounded-bl-[100px]" />
                
                <div className="mb-6">
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Listing Price</span>
                  <h2 className="text-4xl font-black text-gray-900 mt-1">${property.price.toLocaleString()}</h2>
                </div>

                <div className="mb-8 space-y-1">
                  <p className="font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#327878] text-xs" />
                    {property.location.address}
                  </p>
                  <p className="text-gray-400 text-sm ml-5">{property.location.city}, {property.location.state || "State"} 60601</p>
                </div>

                <div className="space-y-3 mb-8">
                  <button className="w-full bg-[#327878] text-white py-4 rounded-xl font-bold hover:bg-[#286161] hover:shadow-lg transition-all duration-300">Schedule a Tour</button>
                  <button className="w-full border-2 border-[#327878] text-[#327878] py-4 rounded-xl font-bold hover:bg-[#327878] hover:text-white transition-all duration-300">Request Information</button>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={`http://localhost:8080/assets/${property.owner.avatar}`} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f0f5f5]" />
                    <div>
                      <p className="text-sm font-bold">{property.owner.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{property.owner.position || "Agent"}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${property.owner.phone}`} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#327878] transition"><FontAwesomeIcon icon={faPhone} size="xs" /></a>
                    <a href={`mailto:${property.owner.email}`} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#327878] transition"><FontAwesomeIcon icon={faEnvelope} size="xs" /></a>
                  </div>
                </div>
              </div>

              {isOwner && (
                <div className="bg-gray-900 p-6 rounded-2xl text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Management</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => navigate(`/edit-property/${id}`)} className="bg-white/10 hover:bg-white/20 py-3 rounded-lg font-bold text-xs transition">Edit Details</button>
                    <button onClick={() => navigate(`/`)} className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-lg font-bold text-xs transition">Remove</button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </ContentWrapper>
    </main>
  );
}