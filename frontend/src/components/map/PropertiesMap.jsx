import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { propertyImageUrl } from "../../config/api";
import "leaflet/dist/leaflet.css";
import "./leafletIcons";

export default function PropertiesMap({ properties }) {
  const located = properties.filter((p) => p.location?.lat && p.location?.lng);
  const center = located.length
    ? [located[0].location.lat, located[0].location.lng]
    : [44.7866, 20.4489];

  return (
    <div className="h-[600px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
      <MapContainer center={center} zoom={located.length ? 12 : 5} className="w-full h-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {located.map((property) => (
          <Marker key={property._id} position={[property.location.lat, property.location.lng]}>
            <Popup>
              <div className="w-48 space-y-2">
                <img
                  src={propertyImageUrl(property.images[0])}
                  alt={property.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="font-bold text-sm">{property.title}</p>
                <p className="text-[#327878] font-black text-sm">${property.price?.toLocaleString()}</p>
                <Link to={`/propertie/${property._id}`} className="block text-center bg-[#327878] text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-lg">
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
