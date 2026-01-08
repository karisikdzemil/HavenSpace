import { useParams } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { useEffect, useState } from "react";

export default function AgentProfile() {
  const [agent, setAgent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getAgent = async () => {
      try {
        const result = await fetch(`http://localhost:8080/api/get-user/${id}`);
        
        if(!result.ok){
            throw new Error('Something went wrong!');
        }
        
        const data = await result.json();
        
        setAgent(data.user);
        
      } catch (err) {
        console.log(err);
      }
    };
    getAgent();
  }, [id]);

  return (
    <section>
      <ContentWrapper>
        {agent && <h1 className="mt-22">Agent {agent.name}</h1>}
      </ContentWrapper>
    </section>
  );
}
