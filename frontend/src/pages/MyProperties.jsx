import ContentWrapper from "../components/contentWrapper";
import { API_BASE_URL } from "../config/api";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import UserInfo from "../components/userInfo";
import { PropertyCardSkeletonGrid } from "../components/loading/PropertyCardSkeleton";
import { RevealGroup, RevealItem } from "../components/motion/Reveal";
import PropertyCard from "../components/propertyCard/PropertyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faEnvelope, faUser, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";

const TABS = [
  { id: "listings", label: "Active Listings" },
  { id: "saved", label: "Saved Properties" },
  { id: "inbox", label: "Inbox" },
];

export default function MyProperties() {
  const [activeTab, setActiveTab] = useState("listings");
  const [properties, setProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavedLoading, setIsSavedLoading] = useState(false);
  const [isInboxLoading, setIsInboxLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (location.hash === "#saved") setActiveTab("saved");
  }, [location.hash]);

  useEffect(() => {
    if (!token && !user) {
      return navigate('/');
    }

    const fetchUserProperties = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(
          `${API_BASE_URL}/api/user-properties/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!result.ok) throw new Error("Fetch failed");
        const data = await result.json();
        setProperties(data.properties);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) fetchUserProperties();
  }, [token, user, navigate]);

  useEffect(() => {
    if (!token || activeTab !== "saved") return;

    const fetchSaved = async () => {
      try {
        setIsSavedLoading(true);
        const result = await fetch(`${API_BASE_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await result.json();
        setSavedProperties(data.properties || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSavedLoading(false);
      }
    };
    fetchSaved();
  }, [token, activeTab]);

  useEffect(() => {
    if (!token || activeTab !== "inbox") return;

    const fetchInquiries = async () => {
      try {
        setIsInboxLoading(true);
        const result = await fetch(`${API_BASE_URL}/api/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await result.json();
        setInquiries(data.inquiries || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsInboxLoading(false);
      }
    };
    fetchInquiries();
  }, [token, activeTab]);

  const markAsRead = async (inquiryId) => {
    try {
      const result = await fetch(`${API_BASE_URL}/api/inquiries/${inquiryId}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!result.ok) throw new Error();
      setInquiries((prev) => prev.map((inq) => (inq._id === inquiryId ? { ...inq, status: "read" } : inq)));
    } catch {
      toast.error("Could not update inquiry.");
    }
  };

  return (
    <section className="min-h-screen bg-[#FBFCFC] pt-36 pb-24">
      <ContentWrapper>
        <div className="flex flex-col gap-16">

          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Agent Dashboard</h2>
              <button
                onClick={() => navigate('/new-listings')}
                className="text-xs font-black uppercase tracking-widest text-[#327878] hover:underline"
              >
                + Post New Listing
              </button>
            </div>
            <UserInfo agent={user} />
          </div>

          <div className="space-y-10">
            <div className="flex flex-wrap items-center gap-3 px-4 border-b border-gray-100 pb-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-1 pb-4 text-sm font-bold transition-colors ${
                    activeTab === tab.id ? "text-[#327878]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                  {tab.id === "inbox" && inquiries.some((i) => i.status === "new") && (
                    <span className="absolute -top-1 -right-3 w-2.5 h-2.5 rounded-full bg-red-500" />
                  )}
                  {activeTab === tab.id && (
                    <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-[#327878] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {activeTab === "listings" && (
              isLoading ? (
                <PropertyCardSkeletonGrid />
              ) : properties.length > 0 ? (
                <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((prop) => (
                    <RevealItem key={prop._id}>
                      <PropertyCard property={prop} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : (
                <div className="bg-white rounded-4xl p-20 border border-dashed border-gray-200 text-center space-y-4">
                  <p className="text-gray-400 font-medium">No properties found in your portfolio.</p>
                  <button
                    onClick={() => navigate('/new-listings')}
                    className="bg-[#327878] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                  >
                    Create Your First Listing
                  </button>
                </div>
              )
            )}

            {activeTab === "saved" && (
              isSavedLoading ? (
                <PropertyCardSkeletonGrid />
              ) : savedProperties.length > 0 ? (
                <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {savedProperties.map((prop) => (
                    <RevealItem key={prop._id}>
                      <PropertyCard property={prop} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : (
                <div className="bg-white rounded-4xl p-20 border border-dashed border-gray-200 text-center space-y-4">
                  <p className="text-gray-400 font-medium">You haven't saved any properties yet.</p>
                  <button
                    onClick={() => navigate('/properties')}
                    className="bg-[#327878] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                  >
                    Browse Properties
                  </button>
                </div>
              )
            )}

            {activeTab === "inbox" && (
              isInboxLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-3xl bg-white border border-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : inquiries.length > 0 ? (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className={`bg-white rounded-3xl p-6 border ${inq.status === "new" ? "border-[#327878]/30" : "border-gray-100"} flex flex-col md:flex-row gap-4 md:items-center md:justify-between`}
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {inq.status === "new" && (
                            <span className="bg-[#327878] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full">New</span>
                          )}
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{inq.type}</span>
                          {inq.property?.title && (
                            <span className="text-[11px] font-bold text-[#327878]">· {inq.property.title}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-700">
                          <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUser} className="text-gray-300" /> {inq.name}</span>
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-2 hover:text-[#327878] transition"><FontAwesomeIcon icon={faEnvelope} className="text-gray-300" /> {inq.email}</a>
                          {inq.phone && <a href={`tel:${inq.phone}`} className="flex items-center gap-2 hover:text-[#327878] transition"><FontAwesomeIcon icon={faPhone} className="text-gray-300" /> {inq.phone}</a>}
                        </div>
                        <p className="text-gray-500 text-sm">{inq.message}</p>
                        <p className="text-[10px] text-gray-300 font-bold flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faClock} /> {new Date(inq.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {inq.status === "new" && (
                        <button
                          onClick={() => markAsRead(inq._id)}
                          className="bg-[#f0f7f7] text-[#327878] px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#327878] hover:text-white transition-all shrink-0 flex items-center gap-2"
                        >
                          <FontAwesomeIcon icon={faEnvelopeOpenText} /> Mark as Read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-4xl p-20 border border-dashed border-gray-200 text-center">
                  <p className="text-gray-400 font-medium">No inquiries yet. Tour requests and messages from buyers will appear here.</p>
                </div>
              )
            )}
          </div>

        </div>
      </ContentWrapper>
    </section>
  );
}
