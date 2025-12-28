import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import Loading from "../components/loading/Loading";

export default function Propertie() {
  const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProperty = async () => {
      try {
        setLoading(true);
        const result = await fetch(`http://localhost:8080/api/property/${id}`);
        const data = await result.json();
        console.log(data);
        setProperty(data.property);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProperty();
  }, [id]);

  const deletePropertyHandler = async () => {
    const token = localStorage.getItem('token');
    try{
        setDeleteLoading(true);
        const response = await fetch(`http://localhost:8080/api/property/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(!response.ok){
            throw Error('Something went wrong!!!');
        }

        const data = await response.json();
        setDeleteLoading(false);
        alert(data.message);
        navigate('/');
    }catch(err){
        console.log(err);
    }
  }

  return (
    <section>
      {loading ? <div className="pt-36"><Loading loadingText={'Loading property details'}/></div> : <ContentWrapper>
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
        <button onClick={deletePropertyHandler} className="text-xl text-white bg-red-500 w-full rounded-md p-3 text-center cursor-pointer hover:bg-red-600 hover:p-4 transition-all mt-5">{deleteLoading ? "Deleting..." : "Delete Property"}</button>
        <a href={`/edit-property/${id}`} className="text-xl text-white bg-gray-300 w-full rounded-md p-3 text-center cursor-pointer hover:bg-gray-400 hover:p-4 transition-all mt-5">Edit Property</a>
        </ContentWrapper>}
    </section>
  );
}
