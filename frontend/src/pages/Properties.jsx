import { useEffect, useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getProperties();
  }, []);

  return (
    <section className="pt-36">
      <PropertyListingsSections
        title="Explore Our Property Listings"
        text="Discover our curated selection of properties that cater to various lifestyles and budgets. Whether you're searching for a modern city apartment, a cozy suburban home, or an investment property, our listings have something for everyone."
        properties={properties}
      />
    </section>
  );
}

