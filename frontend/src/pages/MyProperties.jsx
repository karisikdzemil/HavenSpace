import { useEffect } from "react";
import ContentWrapper from "../components/contentWrapper";
import { useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user } = useAuth();

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

    const fetchUser = async () => {
      try{
        const result = await fetch(`http://localhost:8080/api/get-user/${user}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(result)
        const data = await result.json();
        setUserData(data);

        console.log(data);
      }catch(err){
        console.log(err);
      }
    }
    fetchUser();
  }, [token, user]);
  return (
    <section className="pt-36">
      <ContentWrapper>
        {isLoading ? <Loading loadingText={'Loading your properties'}/> : <PropertyListingsSections properties={properties} />}
      </ContentWrapper>
    </section>
  );
}
