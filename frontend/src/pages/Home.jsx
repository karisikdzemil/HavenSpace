// import { useEffect, useState } from "react";
import AgentsSection from "../components/home/AgentsSection";
import AboutUs from "../components/home/homeAbout/AboutUs";
import HomeHeroSection from "../components/home/homeHeroSection";
import PerfectInvestment from "../components/home/PerfectInvestment";
import Properties from "../components/home/properties/Properties";
import WhyUs from "../components/home/why-us/WhyUs";
import Loading from "../components/loading/Loading";
import { useEffect, useState } from "react";

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
      <AboutUs />
      <Properties properties={properties}/>
      <WhyUs />'
      <AgentsSection />
      <PerfectInvestment />
    </>
  );
}
