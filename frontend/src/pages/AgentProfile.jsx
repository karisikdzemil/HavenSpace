import { useParams } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { useEffect, useState } from "react";
// import PropertyListingsSections from "../components/propertyListingsSection";

export default function AgentProfile() {
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getAgent = async () => {
      try {
        const result = await fetch(`http://localhost:8080/api/get-user/${id}`);
        if (!result.ok) throw new Error("Something went wrong!");

        const data = await result.json();
        setAgent(data.user);
        console.log(data);
        if(data && data.user._id){ 
            const res = await fetch(`http://localhost:8080/api/user-properties/${data.user._id}`);

            if(!res.ok){
                throw new Error('Something went wrong!');
            }

            const userProperties = await res.json();

            setProperties(userProperties.properties);

            console.log("user properties:", userProperties);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAgent();
  }, [id]);

  if (!agent) {
    return (
      <section>
        <ContentWrapper>
          <p>Loading agent...</p>
        </ContentWrapper>
      </section>
    );
  }

  return (
    <section className="py-12">
      <ContentWrapper>
        <div className="flex gap-10 mt-22 items-start">

          <div className="w-48 shrink-0">
            <img
              src={`http://localhost:8080/assets/${agent.avatar}`}
              alt={`${agent.name} ${agent.surname}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">
              {agent.name} {agent.surname}
            </h1>

            <p className="text-gray-500 mb-4">
              {agent.position} • {agent.location}
            </p>

            <p className="mb-6 leading-relaxed max-w-2xl">
              {agent.description}
            </p>

            <div className="flex gap-8 mb-6">
              <div>
                <p className="text-xl font-semibold">
                  {agent.soldProperties}
                </p>
                <p className="text-sm text-gray-500">Sold properties</p>
              </div>

              <div>
                <p className="text-xl font-semibold">
                  €{agent.totalSales.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total sales</p>
              </div>

              <div>
                <p className="text-xl font-semibold">
                  {agent.myListings.length}
                </p>
                <p className="text-sm text-gray-500">Active listings</p>
              </div>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {agent.email}
              </p>
              <p>
                <strong>Phone:</strong> {agent.phone}
              </p>
              <p>
                <strong>Languages:</strong> {agent.languages.join(", ")}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              {agent.linkedin && (
                <a
                  href={agent.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  LinkedIn
                </a>
              )}

              {agent.instagram && (
                <a
                  href={agent.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              )}

              {agent.facebook && (
                <a
                  href={agent.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>
            
        {/* <PropertyListingsSections properties={properties}/>     */}
      </ContentWrapper>
    </section>
  );
}
