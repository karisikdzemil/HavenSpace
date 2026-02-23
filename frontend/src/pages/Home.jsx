// import { useEffect, useState } from "react";
import HomeHeroSection from "../components/home/homeHeroSection";
import Loading from "../components/loading/Loading";

export default function Home() {
  // const [properties, setProperties] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getProperties = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("http://localhost:8080/api/properties");

  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }

  //       const data = await res.json();
  //       setProperties(data.properties);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   getProperties();
  // }, []);

  return (
    <>
      <HomeHeroSection />

    </>
  );
}
