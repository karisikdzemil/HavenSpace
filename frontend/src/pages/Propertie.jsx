import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { API_BASE_URL, avatarUrl, propertyImageUrl } from "../config/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLocationDot, faPhone, faEnvelope, 
  faBed, faBath, faMaximize, faWarehouse,
  faCalendarDays, faShieldHeart, faTree, faBolt, faWater,
  faShareNodes, faPrint, faHeart, faXmark, faChevronLeft, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../components/contentWrapper";
import PropertyDetailSkeleton from "../components/loading/PropertyDetailSkeleton";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";
import { useToast } from "../hooks/useToast";
import ConfirmDialog from "../components/modal/ConfirmDialog";
import InquiryModal from "../components/inquiry/InquiryModal";
const PropertyLocationMap = lazy(() => import("../components/map/PropertyLocationMap"));
import Reveal, { RevealGroup, RevealItem } from "../components/motion/Reveal";

export default function Propertie() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inquiryType, setInquiryType] = useState(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const getProperty = async () => {
      try {
        setLoading(true);
        const result = await fetch(`${API_BASE_URL}/api/property/${id}`);
        const data = await result.json();
        setProperty(data.property);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    getProperty();
  }, [id]);


const deleteProperty = async () => {
  const token = localStorage.getItem("token");
  setIsDeleting(true);

  try {
    const result = await fetch(`${API_BASE_URL}/api/property/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      toast.error("Deleting failed, try again later!");
      setIsDeleting(false);
      return;
    }

    toast.success("Listing removed successfully.");
    navigate("/");
  } catch {
    toast.error("Deleting failed, try again later!");
    setIsDeleting(false);
  }
}

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- nextImage/prevImage close over currentImgIndex/property, already listed below
  }, [isLightboxOpen, currentImgIndex, property]);

  if (loading) return <PropertyDetailSkeleton />;
  if (!property) return null;

  const isOwner = user && property.owner._id === user._id;

  const openLightbox = (index) => {
    setCurrentImgIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden"; 
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset"; 
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const favoriteHandler = async () => {
    const result = await toggleFavorite(property._id);
    if (result.requiresAuth) {
      toast.info("Please log in to save properties.");
      navigate("/register");
      return;
    }
    if (!result.ok) {
      toast.error(result.message || "Could not update favorites.");
      return;
    }
    toast.success(result.isFavorite ? "Added to saved properties." : "Removed from saved properties.");
  };

  const shareHandler = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this property on HavenSpace: ${property.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled share, no-op
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link.");
    }
  };

  return (
    <main className="bg-white min-h-screen pb-20 pt-24">
      <ContentWrapper>
        <div className="flex justify-between items-center mb-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-[#327878] transition">Properties</Link>
            <span>/</span>
            <span className="text-gray-900">{property.type} in {property.location.city}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={favoriteHandler}
              className={`p-2.5 rounded-full border transition ${
                isFavorite(property._id)
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button onClick={shareHandler} className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-[#327878] hover:bg-gray-50 transition"><FontAwesomeIcon icon={faShareNodes} /></button>
            <button onClick={() => window.print()} className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-gray-900 transition"><FontAwesomeIcon icon={faPrint} /></button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1 max-w-[850px]">
            
            <Reveal direction="scale" className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-10">
              
              <div 
                onClick={() => openLightbox(0)} 
                className="md:col-span-3 col-span-4 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <img src={propertyImageUrl(property.images[0])} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest text-[#327878]">Featured</div>
              </div>

              <div 
                onClick={() => openLightbox(1)} 
                className="md:col-span-1 col-span-2 rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              >
                <img src={propertyImageUrl(property.images[1] || property.images[0])} className="w-full h-full object-cover transition duration-300 group-hover:brightness-90" />
              </div>

              <div 
                onClick={() => openLightbox(2)} 
                className="md:col-span-1 col-span-2  relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
              >
                <img src={propertyImageUrl(property.images[2] || property.images[0])} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white font-bold text-lg transition group-hover:bg-black/60">
                  <span>+{property.images.length} Photos</span>
                </div>
              </div>
            </Reveal>

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
              
              <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
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

                {activeTab === "neighborhood" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <FontAwesomeIcon icon={faLocationDot} className="text-[#327878]" />
                      {property.location.address}, {property.location.city}
                    </div>
                    <Suspense fallback={<div className="h-[350px] rounded-3xl bg-gray-50 animate-pulse" />}>
                      <PropertyLocationMap
                        lat={property.location.lat}
                        lng={property.location.lng}
                        title={property.title}
                        address={`${property.location.address}, ${property.location.city}`}
                      />
                    </Suspense>
                  </div>
                )}
              </motion.div>
              </AnimatePresence>
            </div>

            <RevealGroup className="grid grid-cols-3 gap-4 mb-12" staggerDelay={0.1}>
              <RevealItem direction="scale" className="p-6 rounded-2xl bg-[#f0f5f5] border border-[#dceaea]">
                <FontAwesomeIcon icon={faShieldHeart} className="text-[#327878] mb-3 text-xl" />
                <h4 className="font-bold text-sm mb-1">Safety First</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Integrated smart security systems and 24/7 monitoring active.</p>
              </RevealItem>
              <RevealItem direction="scale" className="p-6 rounded-2xl bg-[#f0f5f5] border border-[#dceaea]">
                <FontAwesomeIcon icon={faBolt} className="text-[#327878] mb-3 text-xl" />
                <h4 className="font-bold text-sm mb-1">Energy Efficient</h4>
                <p className="text-xs text-gray-500 leading-relaxed">A+ energy rating with solar readiness and thermal insulation.</p>
              </RevealItem>
              <RevealItem direction="scale" className="p-6 rounded-2xl bg-[#f0f5f5] border border-[#dceaea]">
                <FontAwesomeIcon icon={faWater} className="text-[#327878] mb-3 text-xl" />
                <h4 className="font-bold text-sm mb-1">Pure Living</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Advanced water filtration system installed throughout the home.</p>
              </RevealItem>
            </RevealGroup>
          </div>

          <aside className="w-full lg:w-[380px]">
            <Reveal direction="right" duration={0.6} className="sticky top-28 space-y-6">
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
                  <button onClick={() => setInquiryType("tour")} className="w-full bg-[#327878] text-white py-4 rounded-xl font-bold hover:bg-[#286161] hover:shadow-lg transition-all duration-300">Schedule a Tour</button>
                  <button onClick={() => setInquiryType("info")} className="w-full border-2 border-[#327878] text-[#327878] py-4 rounded-xl font-bold hover:bg-[#327878] hover:text-white transition-all duration-300">Request Information</button>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={avatarUrl(property.owner.avatar)} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f0f5f5]" />
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
                    <button onClick={() => setIsDeleteOpen(true)} className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-lg font-bold text-xs transition">Remove</button>
                  </div>
                </div>
              )}
            </Reveal>
          </aside>
        </div>
      </ContentWrapper>

      <AnimatePresence>
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/95 z-9999 flex flex-col justify-between p-4 backdrop-blur-sm select-none"
        >
          <div className="flex justify-between items-center text-white w-full max-w-7xl mx-auto py-2">
            <span className="text-sm font-semibold tracking-wider bg-white/10 px-4 py-1.5 rounded-full">
              {currentImgIndex + 1} / {property.images.length}
            </span>
            <button 
              onClick={closeLightbox} 
              className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 text-white transition-all text-xl"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex items-center justify-between w-full max-w-7xl mx-auto h-[75vh] relative px-4">
            
            <button 
              onClick={prevImage} 
              className="absolute left-6 z-50 w-12 h-12 bg-black/40 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="w-full h-full flex items-center justify-center p-2">
              <img 
                src={propertyImageUrl(property.images[currentImgIndex])}
                alt={`Property view ${currentImgIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300"
              />
            </div>

            <button 
              onClick={nextImage} 
              className="absolute right-6 z-50 w-12 h-12 bg-black/40 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="w-full max-w-4xl mx-auto overflow-x-auto flex items-center gap-3 py-4 justify-center">
            {property.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImgIndex(index)}
                className={`w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 border-2 shrink-0 ${
                  currentImgIndex === index ? "border-[#327878] scale-105 opacity-100 shadow-md" : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <img src={propertyImageUrl(img)} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </motion.div>
      )}
      </AnimatePresence>

      <ConfirmDialog
        open={isDeleteOpen}
        title="Remove this listing?"
        description="This will permanently delete the property and its photos. This action cannot be undone."
        confirmLabel="Remove Listing"
        isLoading={isDeleting}
        onConfirm={deleteProperty}
        onCancel={() => setIsDeleteOpen(false)}
      />

      <InquiryModal
        open={!!inquiryType}
        type={inquiryType}
        propertyId={property._id}
        ownerId={property.owner._id}
        onClose={() => setInquiryType(null)}
      />
    </main>
  );
}