import HomeDiscover from "../components/home/homeDiscover";
import HomeHeroSection from "../components/home/homeHeroSection";
import PropertyListingsSections from "../components/propertyListingsSection";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeDiscover />
      <PropertyListingsSections />
    </>
  );
}
