import { useEffect } from "react";
import ContentWrapper from "../components/contentWrapper";
import { useState } from "react";
import PropertyListingsSections from "../components/propertyListingsSection";
import Loading from "../components/loading/Loading";

export default function MyProperties (){
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchUserProperties = async () => {
            const token = localStorage.getItem('token');
            try{
                const result = await fetch('http://localhost:8080/api/user-properties', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(!result.ok){
                    console.log('Something went wrong!');
                    return;
                }
                
                const data = await result.json();
                console.log(data);
                setProperties(data.properties);

            }catch(err){
                console.log(err);
            }
        }
        fetchUserProperties();
    }, []);
    return (
        <section>
            <ContentWrapper>
                <PropertyListingsSections properties={properties}/>
                <Loading />
            </ContentWrapper>
        </section>
    )
}