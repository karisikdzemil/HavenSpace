import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "../../config/api";
import { faBath, faBed, faLocationDot, faMaximize, faWarehouse, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useToast } from "../../hooks/useToast";

const SpecItem = ({ icon, text }) => (
  <div className="flex items-center gap-1.5">
    <FontAwesomeIcon icon={icon} className="text-[#327878] text-sm" />
    <span className="text-gray-600 text-sm font-medium">{text}</span>
  </div>
);

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const toast = useToast();
  const navigate = useNavigate();
  const favorited = isFavorite(property._id);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const favoriteHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await toggleFavorite(property._id);

    if (result.requiresAuth) {
      toast.info("Please log in to save properties.");
      navigate("/register");
      return;
    }
    if (!result.ok) {
      toast.error(result.message || "Could not update favorites.");
      return;
    }
    toast.success(result.isFavorite ? "Added to saved properties." : "Removed from saved properties.");
  };

  return (
    <div className="w-full">
    <div className="group w-full bg-white rounded-4xl p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(50,120,120,0.2)] transition-all duration-500 cursor-pointer border border-gray-50">
      <Link to={`/propertie/${property._id}`} className="block">

        <div className="relative w-full h-64 overflow-hidden rounded-3xl">
          <div
            style={{ backgroundImage: `url(${API_BASE_URL}/${property.images[0]})` }}
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            <span className="text-[#327878] text-xs font-bold uppercase tracking-wider">
              {property.status}
            </span>
          </div>
          <button
            onClick={favoriteHandler}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-all hover:scale-110 ${
              favorited ? "bg-red-500 text-white" : "bg-white/90 text-gray-400 hover:text-red-500"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} size="sm" />
          </button>
          <div className="absolute bottom-4 right-4 bg-[#327878] text-white px-5 py-2 rounded-2xl shadow-lg">
            <p className="text-lg font-bold">{formattedPrice}</p>
          </div>
        </div>

        <div className="mt-6 px-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-[#327878] transition-colors">
              {property.title}
            </h3>
            <p className="flex items-center gap-1.5 text-gray-400 text-sm">
              <FontAwesomeIcon icon={faLocationDot} className="text-[#327878]/60" />
              {property.location.city}, {property.location.address}
            </p>
          </div>

          <div className="my-5 h-px w-full bg-gray-100" />

          <div className="grid grid-cols-2 gap-y-4 mb-2">
            <SpecItem icon={faBed} text={`${property.bedNum} Beds`} />
            <SpecItem icon={faBath} text={`${property.bathNum} Baths`} />
            <SpecItem icon={faMaximize} text={`${property.area} m²`} />
            <SpecItem icon={faWarehouse} text={`${property.garage} Garage`} />
          </div>
        </div>
      </Link>
    </div>
    </div>
  );
}
