import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leafletIcons";

export default function PropertyLocationMap({ lat, lng, title, address }) {
  if (!lat || !lng) {
    return (
      <div className="h-[350px] rounded-3xl bg-gray-50 flex items-center justify-center text-gray-400 text-sm font-bold">
        Location not available for this property.
      </div>
    );
  }

  return (
    <div className="h-[350px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
      <MapContainer center={[lat, lng]} zoom={14} className="w-full h-full" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <p className="font-bold text-sm">{title}</p>
            <p className="text-xs text-gray-500">{address}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
