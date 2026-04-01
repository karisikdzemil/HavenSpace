import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faRulerCombined, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function FeaturedPropertyCard({ item }) {
  if (!item) return null;

  return (
    <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-50 group">
      {/* IMAGE SECTION */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={`http://localhost:8080/assets/${item.images[0]}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          alt={item.title}
        />
        
        {/* Top Badges */}
        <div className="absolute top-8 left-8 flex gap-3">
          <span className="bg-[#327878] text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg">
            Featured
          </span>
          <span className="bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/20">
            Premium
          </span>
        </div>

        {/* Bottom Stats Overlay */}
        <div className="absolute bottom-8 left-8 flex gap-3">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 text-white">
            <FontAwesomeIcon icon={faBed} className="text-[#327878]" />
            <span className="text-sm font-bold">{item.bedNum} Beds</span>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 text-white">
            <FontAwesomeIcon icon={faBath} className="text-[#327878]" />
            <span className="text-sm font-bold">{item.bathNum} Baths</span>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 text-white">
            <FontAwesomeIcon icon={faRulerCombined} className="text-[#327878]" />
            <span className="text-sm font-bold">{item.area} sq ft</span>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-12 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {item.title}
            </h2>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
              <FontAwesomeIcon icon={faLocationDot} className="text-[#327878]" />
              {item.location.address}, {item.location.city}
            </div>
          </div>
          
          <div className="bg-[#327878] text-white px-8 py-4 rounded-[2rem] shadow-xl shadow-[#327878]/20">
            <span className="text-3xl font-black tracking-tighter">
              ${item.price?.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-lg leading-relaxed max-w-4xl line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 gap-6">
          <div className="flex gap-4">
            <button className="bg-[#327878] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-lg shadow-[#327878]/10">
              Arrange Visit
            </button>
            <button className="border-2 border-[#327878] text-[#327878] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#327878] hover:text-white transition-all duration-500">
              More Photos
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg">
              For Sale
            </span>
            <span className="text-gray-300 text-[11px] font-bold italic">
              Listed 2 days ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}