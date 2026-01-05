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
    fetch(`http://localhost:8080/api/properties?page=${page}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setPagination(data.pagination);
      });
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
          <div className="flex gap-2 justify-center mt-10">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>

            <span>
              {pagination?.currentPage} / {pagination?.totalPages}
            </span>

            <button
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
