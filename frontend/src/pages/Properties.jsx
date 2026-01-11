import { useEffect, useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";

const INITIAL_FILTERS = {
  type: "any",
  minPrice: "",
  maxPrice: "",
  bedNum: "any",
  bathNum: "any",
  location: "",
};

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS);

  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const activeStyle = "bg-red-500";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProperties = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page,
          limit: 2,
          ...appliedFilters,
        });

        console.log(appliedFilters)

        const res = await fetch(
          `http://localhost:8080/api/properties?${params.toString()}`
        );

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
    setDraftFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    <section className="pt-36 flex p-5">
      <div className="flex-1">
        {loading ? (
          <Loading loadingText="Loading properties" />
        ) : (
          <>
            <PropertyListingsSections
              title="Explore Our Property Listings"
              text="Discover our curated selection of properties that cater to various lifestyles and budgets."
              properties={properties}
            />

            <div className="flex gap-5 justify-center items-center pb-5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="bg-gray-600 text-white px-5 py-2 rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-xl">
                {pagination?.currentPage} / {pagination?.totalPages}
              </span>

              <button
                disabled={page === pagination?.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="bg-gray-600 text-white px-5 py-2 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <div className="w-lg bg-gray-400 p-5">
        <form onSubmit={submitFiltersFormHandler}>
          <label>Property Type</label>
          <select
            value={draftFilters.type}
            onChange={(e) => setDraftValue("type", e.target.value)}
            className="w-full h-8 mt-2 bg-white"
          >
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>

          <div className="flex mt-2 gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={draftFilters.minPrice}
              onChange={(e) => setDraftValue("minPrice", e.target.value)}
              className="w-1/2 h-8 pl-2 bg-white"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={draftFilters.maxPrice}
              onChange={(e) => setDraftValue("maxPrice", e.target.value)}
              className="w-1/2 h-8 pl-2 bg-white"
            />
          </div>

          {/* Bedrooms */}
          <FilterButtons
            label="Bedrooms"
            value={draftFilters.bedNum}
            onChange={(v) => setDraftValue("bedNum", v)}
            activeStyle={activeStyle}
          />

          {/* Bathrooms */}
          <FilterButtons
            label="Bathrooms"
            value={draftFilters.bathNum}
            onChange={(v) => setDraftValue("bathNum", v)}
            activeStyle={activeStyle}
          />

          <input
            type="text"
            placeholder="Location"
            value={draftFilters.location}
            onChange={(e) => setDraftValue("location", e.target.value)}
            className="w-full h-8 pl-2 bg-white mt-4"
          />

          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              className="flex-1 h-12 font-bold bg-amber-300"
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={resetFiltersHandler}
              className="flex-1 h-12 font-bold bg-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


function FilterButtons({ label, value, onChange, activeStyle }) {
  const options = ["any", "1", "2", "3", "4"];

  return (
    <div className="flex flex-col mt-4 gap-2">
      <label>{label}</label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-10 h-10 bg-gray-700 text-white rounded-sm ${
              value === opt ? activeStyle : ""
            }`}
          >
            {opt === "any" ? "Any" : opt}
          </button>
        ))}
      </div>
    </div>
  );
}
