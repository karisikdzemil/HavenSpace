import ContentWrapper from "../components/contentWrapper";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import UserInfo from "../components/userInfo";
import { useEffect } from "react";
import Loading from "../components/loading/Loading";
// import PropertyListingsSections from "../components/propertyListingsSection"; 

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user } = useAuth();

  useEffect(() => {
    if (!token && !user) {
      return navigate('/');
    }

    const fetchUserProperties = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(
          `http://localhost:8080/api/user-properties/${user._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!result.ok) throw new Error("Fetch failed");
        
        const data = await result.json();
        setProperties(data.properties);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    
    if (user?._id) fetchUserProperties();
  }, [token, user, navigate]);

  return (
    <section className="min-h-screen bg-[#FBFCFC] pt-36 pb-24">
      <ContentWrapper>
        <div className="flex flex-col gap-16">
          
          {/* TOP SECTION: User Info Card */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Agent Dashboard</h2>
              <button 
                onClick={() => navigate('/add-property')}
                className="text-xs font-black uppercase tracking-widest text-[#327878] hover:underline"
              >
                + Post New Listing
              </button>
            </div>
            <UserInfo agent={user} />
          </div>

          {/* BOTTOM SECTION: Properties Grid */}
          <div className="space-y-10">
            <div className="text-center lg:text-left px-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Your Active Listings</h2>
              <p className="text-gray-400 text-sm font-medium">You currently have {properties.length} properties live on the market.</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loading loadingText="Retrieving your properties..." />
              </div>
            ) : properties.length > 0 ? (
                // Ovde otkomentariši kada budeš spreman da renderuješ listu
                // <PropertyListingsSections properties={properties} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Mapiranje kroz properties ako nemaš posebnu komponentu */}
                  {properties.map(prop => (
                    <div key={prop._id} className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 italic text-xs text-gray-400">
                      Listing: {prop.title} - ${prop.price.toLocaleString()}
                    </div>
                  ))}
                </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-20 border border-dashed border-gray-200 text-center space-y-4">
                <p className="text-gray-400 font-medium">No properties found in your portfolio.</p>
                <button 
                  onClick={() => navigate('/add-property')}
                  className="bg-[#327878] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                  Create Your First Listing
                </button>
              </div>
            )}
          </div>

        </div>
      </ContentWrapper>
    </section>
  );
}