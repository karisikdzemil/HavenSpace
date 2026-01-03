import { useEffect } from "react";
import ContentWrapper from "../components/contentWrapper";
import { useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";
import {useNavigate} from 'react-router-dom';

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

    useEffect(() => {
        if(!token){
          navigate('/');
        }
      }, [token, navigate]);

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(
          "http://localhost:8080/api/user-properties",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result)
        if (!result.ok) {
          console.log("Something went wrong!");
          return;
        }
        const data = await result.json();
        setIsLoading(false);
        setProperties(data.properties);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProperties();
  }, [token]);
  return (
    <section className="pt-36">
      <ContentWrapper>
        {isLoading ? <Loading loadingText={'Loading your properties'}/> : <PropertyListingsSections properties={properties} />}
      </ContentWrapper>
    </section>
  );
}
