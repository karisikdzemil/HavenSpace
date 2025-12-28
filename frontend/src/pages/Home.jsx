import { useEffect, useState } from "react";
import HomeDiscover from "../components/home/homeDiscover";
import HomeHeroSection from "../components/home/homeHeroSection";
import AskedQeustions from "../components/home/questionsSections";
import PropertyListingsSection from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProperties = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8080/api/properties");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        setProperties(data.properties);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getProperties();
  }, []);

  return (
    <>
      <HomeHeroSection />
      <HomeDiscover />
      {isLoading ? <Loading loadingText={'Properties'}/> : <PropertyListingsSection
        title="Our Property Listings"
        text="Discover your dream property from our curated selection of hosues, apartments, and villas. Whether you're looking to buy or rent, we offer a variety of options to suit your lifestyle and budget."
        properties={properties}
      />}
      <AskedQeustions />
    </>
  );
}
