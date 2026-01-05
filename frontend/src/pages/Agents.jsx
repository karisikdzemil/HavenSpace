import { useEffect, useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import UserInfo from "../components/userInfo";

export default function Agents() {
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/agents");
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await res.json();
        setAgents(data.agents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <section className="pt-36">
        <ContentWrapper>
          <p>Loading agents...</p>
        </ContentWrapper>
      </section>
    );
  }

  if (agents.length === 0) {
    return (
      <section className="pt-36">
        <ContentWrapper>
          <p>No agents found.</p>
        </ContentWrapper>
      </section>
    );
  }

  const [topAgent, ...otherAgents] = agents;

  return (
    <section className="pt-36">
      <ContentWrapper>
        {/* TOP AGENT */}
        <UserInfo agent={topAgent} />

        {/* OTHER AGENTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {otherAgents.map((agent) => (
            <div
              key={agent._id}
              className="bg-gray-100 rounded-md p-5 flex flex-col gap-4"
            >
              <img
                src={`http://localhost:8080/assets/${agent.avatar}`}
                alt="Agent"
                className="w-full h-56 object-cover rounded-md"
              />

              <div>
                <p className="font-bold text-xl">
                  {agent.name} {agent.surname}
                </p>
                <p className="text-sm text-gray-600">{agent.position}</p>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">
                {agent.description}
              </p>

              <div className="flex justify-between text-sm mt-2">
                <p>
                  <span className="font-bold">{agent.soldProperties}</span> Sold
                </p>
                <p>
                  <span className="font-bold">${agent.totalSales}</span> Sales
                </p>
              </div>

              <a
                href={`/agents/${agent._id}`}
                className="mt-auto text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
}
