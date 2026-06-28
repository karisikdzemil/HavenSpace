import { API_BASE_URL } from "../config/api";
import AgentsSection from "../components/home/AgentsSection";
import AiSearch from "../components/home/AI-search/ai-search";
import AboutUs from "../components/home/homeAbout/AboutUs";
import HomeHeroSection from "../components/home/homeHeroSection";
import PerfectInvestment from "../components/home/PerfectInvestment";
import Properties from "../components/home/properties/Properties";
import WhyUs from "../components/home/why-us/WhyUs";
import ContentWrapper from "../components/contentWrapper";
import { PropertyCardSkeletonGrid } from "../components/loading/PropertyCardSkeleton";
import { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProperties = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/properties`);

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProperties();
  }, []);

  return (
    <>
      <HomeHeroSection />
      <AiSearch />
      <AboutUs />
      {isLoading ? (
        <section id="featured-properties" className="pt-8 bg-[#FBFCFC]">
          <ContentWrapper>
            <PropertyCardSkeletonGrid count={3} className="grid grid-cols-1 lg:grid-cols-3 gap-10" />
          </ContentWrapper>
        </section>
      ) : (
        <Properties properties={properties} />
      )}
      <WhyUs />
      <AgentsSection />
      <PerfectInvestment />
    </>
  );
}
