import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";

export default function Propertie() {
  const [property, setProperty] = useState(null);
  //   const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getProperty = async () => {
      try {
        // setLoading(true);
        const result = await fetch(`http://localhost:8080/api/property/${id}`);
        const data = await result.json();
        console.log(data);
        setProperty(data.property);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProperty();
  }, [id]);

  return (
    <section>
      <ContentWrapper>
        <div className="w-full flex items-center justify-between pt-22">
        {property && <h1 className="text-4xl font-medium">{property.title}</h1>}
        {property && <p className="text-4xl font-light">${property.price}</p>}
        </div>
        <div className="bg-[url(/heroBackground.png)] mt-12 w-full h-[60vh] bg-cover bg-center rounded-md "></div>
        {/* images */}

        <div className="flex pt-12">
            <div className="w-2/3">
                <div className="flex flex-col justify-start gap-3">
                    <h3 className="text-2xl font-light">About This Home</h3>
                    {property && <p className="text-gray-700 font-light">{property.description}</p>}
                </div>
            </div>
            <div className="w-1/3">
                <div className="w-full h-60 rounded-md border-2 border-gray-600">
                    <p>Property Agent</p>
                </div>
            </div>
        </div>
        </ContentWrapper>
    </section>
  );
}
