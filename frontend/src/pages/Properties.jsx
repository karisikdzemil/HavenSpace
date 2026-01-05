import { useEffect, useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // useEffect(() => {
  //   const getProperties = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch("http://localhost:8080/api/properties");

  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }

  //       const data = await res.json();
  //       setProperties(data.properties);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   getProperties();
  // }, []);

  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/properties?page=${page}&limit=2`
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
}, [page]);
  return (
    <section className="pt-36">
      {loading ? (
        <Loading loadingText={"Loading properties"} />
      ) : (
        <>
          <PropertyListingsSections
            title="Explore Our Property Listings"
            text="Discover our curated selection of properties that cater to various lifestyles and budgets. Whether you're searching for a modern city apartment, a cozy suburban home, or an investment property, our listings have something for everyone."
            properties={properties}
          />
          <div className="flex gap-5 justify-center items-center pb-5">
            <button className="bg-gray-600 cursor-pointer text-white px-5 py-2 rounded-md" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>

            <span className="text-xl">
              {pagination?.currentPage} / {pagination?.totalPages}
            </span>

            <button
            className="bg-gray-600 cursor-pointer text-white px-5 py-2 rounded-md"
              disabled={page === pagination?.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
