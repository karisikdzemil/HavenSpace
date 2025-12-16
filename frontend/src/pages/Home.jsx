import { useEffect } from "react";
import HomeDiscover from "../components/home/homeDiscover";
import HomeHeroSection from "../components/home/homeHeroSection";
import AskedQeustions from "../components/home/questionsSections";
import PropertyListingsSection from "../components/propertyListingsSection";

export default function Home() {  

 useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        console.log(data);
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
      <PropertyListingsSection />
      <AskedQeustions />
    </>
  );
}
