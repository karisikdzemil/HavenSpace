import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSliders, faSearch, faArrowRotateLeft, faChevronLeft, 
  faChevronRight, faHouse, faBuilding, faLayerGroup 
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/loading/Loading";
import PropertyCard from "../components/propertyCard/PropertyCard";
import ContentWrapper from "../components/contentWrapper";

const INITIAL_FILTERS = {
  type: "any",
  minPrice: "",
  maxPrice: "",
  bedNum: "any",
  bathNum: "any",
  city: "",
};

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          limit: 6,
          ...appliedFilters,
        });
        const res = await fetch(`http://localhost:8080/api/properties?${params.toString()}`);
        const data = await res.json();
        setProperties(data.properties);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, appliedFilters]);

  const setDraftValue = (field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const submitFiltersFormHandler = (e) => {
    e.preventDefault();
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const resetFiltersHandler = () => {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setPage(1);
  };

  return (
    <main className="bg-[#FBFCFC] min-h-screen pt-32 pb-20">
      <ContentWrapper>
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT SIDE: FILTERS STICKY */}
          <aside className="w-full lg:w-[350px]">
            <div className="sticky top-32 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <FontAwesomeIcon icon={faSliders} className="text-[#327878] text-sm" />
                  Filters
                </h2>
                <button 
                  onClick={resetFiltersHandler}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#327878] transition flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faArrowRotateLeft} /> Reset
                </button>
              </div>

              <form onSubmit={submitFiltersFormHandler} className="space-y-8">
                {/* Property Type Icons */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Property Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'any', label: 'All', icon: faLayerGroup },
                      { id: 'house', label: 'House', icon: faHouse },
                      { id: 'apartment', label: 'Apart.', icon: faBuilding }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDraftValue("type", t.id)}
                        className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all ${
                          draftFilters.type === t.id 
                          ? "border-[#327878] bg-[#f0f5f5] text-[#327878]" 
                          : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                        }`}
                      >
                        <FontAwesomeIcon icon={t.icon} className="mb-2" />
                        <span className="text-[10px] font-bold">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Price Range ($)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={draftFilters.minPrice}
                      onChange={(e) => setDraftValue("minPrice", e.target.value)}
                      className="w-1/2 bg-[#FBFCFC] border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#327878] transition"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={draftFilters.maxPrice}
                      onChange={(e) => setDraftValue("maxPrice", e.target.value)}
                      className="w-1/2 bg-[#FBFCFC] border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#327878] transition"
                    />
                  </div>
                </div>

                {/* City Search */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Location</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                    <input
                      type="text"
                      placeholder="Search city..."
                      value={draftFilters.city}
                      onChange={(e) => setDraftValue("city", e.target.value)}
                      className="w-full bg-[#FBFCFC] border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#327878] transition"
                    />
                  </div>
                </div>

                <FilterButtons label="Bedrooms" value={draftFilters.bedNum} onChange={(v) => setDraftValue("bedNum", v)} />
                <FilterButtons label="Bathrooms" value={draftFilters.bathNum} onChange={(v) => setDraftValue("bathNum", v)} />

                <button
                  type="submit"
                  className="w-full bg-[#327878] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-[#327878]/20 hover:bg-[#286161] transition-all duration-300 pt-5"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </aside>

          {/* RIGHT SIDE: LISTINGS */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Discover Properties</h1>
                <p className="text-gray-400 mt-1">Found {properties.length} results for your search</p>
              </div>
              <div className="hidden md:flex bg-white p-1 rounded-xl border border-gray-100">
                <button className="px-6 py-2 bg-[#f0f5f5] text-[#327878] rounded-lg text-xs font-black uppercase tracking-widest">Grid View</button>
                <button className="px-6 py-2 text-gray-400 rounded-lg text-xs font-black uppercase tracking-widest">Map View</button>
              </div>
            </div>

            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <Loading loadingText="Refreshing results..." />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {properties.map(el => <PropertyCard key={el._id} property={el}/>)}
                </div>

                {/* PAGINATION */}
                {pagination?.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-[#327878] hover:border-[#327878] disabled:opacity-30 transition-all"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div className="flex items-center gap-2">
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setPage(i + 1)}
                          className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all ${
                            page === i + 1 
                            ? "bg-[#327878] text-white shadow-lg shadow-[#327878]/30" 
                            : "bg-white text-gray-400 hover:text-gray-900 border border-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={page === pagination?.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-[#327878] hover:border-[#327878] disabled:opacity-30 transition-all"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </ContentWrapper>
    </main>
  );
}

function FilterButtons({ label, value, onChange }) {
  const options = ["any", "1", "2", "3", "4+"];
  return (
    <div className="space-y-3">
      <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border ${
              value === opt 
              ? "bg-[#327878] text-white border-[#327878]" 
              : "bg-[#FBFCFC] text-gray-400 border-gray-100 hover:border-gray-200"
            }`}
          >
            {opt === "any" ? "Any" : opt}
          </button>
        ))}
      </div>
    </div>
  );
}