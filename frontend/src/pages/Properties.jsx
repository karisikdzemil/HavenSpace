import { useEffect, useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

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
        console.log(data);

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
    <section className="pt-36 flex p-5">
      <div>
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
              <button
                className="bg-gray-600 cursor-pointer text-white px-5 py-2 rounded-md"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
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
      </div>
      <div className="w-lg bg-gray-400 p-5">
        <form action="">
          <label htmlFor="propertyType">Property Type:</label>
          <select className="w-10/12 h-8 mt-2 bg-white" name="types">
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
          <div className="flex mt-2 flex-row gap-2">
            {/* <label htmlFor=""> Price Range</label> */}
            <input
              className="w-1/2 pl-2 h-8 bg-white"
              type="number"
              name="minPrice"
              placeholder="Min Price"
              id=""
            />
            <input
              className="w-1/2 h-8 pl-2 bg-white"
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              id=""
            />
          </div>
          <div className=" flex flex-col mt-2 gap-2">
            <label htmlFor="">Bed Rooms</label>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="any">Any</button>
               <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="1">1</button>
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="2">2</button> 
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="3">3</button>
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="4">4</button>
            </div>
          </div>
           <div className=" flex flex-col mt-2 gap-2">
            <label htmlFor="">Bath Rooms</label>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="any">Any</button>
               <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="1">1</button>
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="2">2</button> 
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="3">3</button>
              <button className="w-10 h-10 rounded-sm bg-gray-700 cursor-pointer text-white" value="4">4</button>
            </div>
          </div>

          <input className="w-full h-8 pl-2 bg-white mt-4" type="text" placeholder="Location" name="location" id="" />

          <button type="submit" className="w-full h-12 font-bold cursor-pointer mt-8 text-md rounded-sm bg-amber-300">Apply Filters</button>
        </form>
      </div>
    </section>
  );
}
