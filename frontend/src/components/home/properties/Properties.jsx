import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, 
  faBath, 
  faRulerCombined, 
  faLocationDot, 
  faArrowRight 
} from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../../contentWrapper";

export default function Properties({ properties }) {
  if (!properties || properties.length === 0) return null;

  // Pomoćna funkcija za nasumične tagove dok ne središ backend logiku
  const getBadge = (index, price) => {
    if (index === 0) return { text: "Featured", color: "bg-[#327878]" };
    if (price > 1000000) return { text: "Exclusive", color: "bg-blue-600" };
    if (index % 3 === 0) return { text: "Hot", color: "bg-orange-500" };
    return { text: "New", color: "bg-[#327878]" };
  };

  // Logika za raspored: 1 velika, 3 u stacku, ostalo dole
  const featured = properties[0];
  const sideStack = properties.slice(1, 4);
  const bottomGrid = properties.slice(4);

  const PropertyCard = ({ item, isHorizontal, index }) => {
    const badge = getBadge(index, item.price);
    
    return (
      <div className={`group bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 ${isHorizontal ? 'flex flex-col h-full' : 'flex flex-col h-full'}`}>
        
        {/* IMAGE CONTAINER */}
        <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto md:h-[450px]">
          <img 
            src={`http://localhost:8080/assets/${item.images[0]}`} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          
          {/* Top Badges (Kao na slici) */}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className={`${badge.color} text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg`}>
              {badge.text}
            </span>
            {item.price > 1000000 && (
              <span className="bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
                Premium
              </span>
            )}
          </div>
          
          {/* Bottom Stats Overlay (Onaj glassmorphism sa slike) */}
          <div className="absolute bottom-6 left-6 flex gap-3">
            <div className="bg-slate-900/30 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-white text-xs font-bold">
              <FontAwesomeIcon icon={faBed} className="text-[#327878]" /> {item.bedNum} Beds
            </div>
            <div className="bg-slate-900/30 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-white text-xs font-bold">
              <FontAwesomeIcon icon={faBath} className="text-[#327878]" /> {item.bathNum} Baths
            </div>
            <div className="bg-slate-900/30 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-white text-xs font-bold">
              <FontAwesomeIcon icon={faRulerCombined} className="text-[#327878]" /> {item.area} sq ft
            </div>
          </div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="p-10 flex flex-col justify-between flex-1">
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight group-hover:text-[#327878] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-[12px] font-bold uppercase tracking-wider">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[#327878]" />
                  {item.location.address}, {item.location.city}
                </div>
              </div>
              <div className="bg-[#327878] text-white px-6 py-3 rounded-2xl text-2xl font-black tracking-tighter shadow-lg shadow-[#327878]/20">
                ${item.price.toLocaleString()}
              </div>
            </div>

            <p className="text-gray-400 text-base leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Action Buttons (Kao na slici) */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-8 border-t border-gray-50 gap-6">
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none bg-[#327878] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md">
                Arrange Visit
              </button>
              <button className="flex-1 sm:flex-none border-2 border-[#327878]/20 text-[#327878] px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#327878] transition-all">
                More Photos
              </button>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                For Sale
              </span>
              <span className="text-gray-300 text-[10px] font-bold italic">
                Listed 2 days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-[#FBFCFC]">
      <ContentWrapper>
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Featured Properties
          </h2>
          <div className="w-20 h-1.5 bg-[#327878] mx-auto rounded-full"></div>
          <p className="text-gray-400 font-medium max-w-lg mx-auto italic">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit.
          </p>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* BIG FEATURED CARD */}
          <div className="lg:col-span-2">
            <PropertyCard item={featured} isHorizontal={true} index={0} />
          </div>

          {/* SIDE STACK (3 Items) */}
          <div className="flex flex-col gap-6">
            {sideStack.map((item) => (
              <div key={item._id} className="bg-white rounded-[2.5rem] p-5 flex gap-6 border border-gray-50 shadow-sm hover:shadow-xl transition-all group cursor-pointer h-full">
                 <div className="w-32 h-32 rounded-[1.5rem] overflow-hidden shrink-0 relative">
                    <img src={`http://localhost:8080/assets/${item.images[0]}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-[7px] font-black uppercase px-2 py-1 rounded-md">Hot</span>
                 </div>
                 <div className="flex flex-col justify-center space-y-2">
                    <h4 className="font-black text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-[#327878] transition-colors">{item.title}</h4>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[9px] font-bold">
                       <FontAwesomeIcon icon={faLocationDot} className="text-[#327878]" />
                       {item.location.city}
                    </div>
                    <p className="text-xl font-black text-slate-900 tracking-tighter">${item.price.toLocaleString()}</p>
                    <button className="bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-4 py-2.5 rounded-xl self-start hover:bg-[#327878] transition-colors">Details</button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM GRID (Rest of properties) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
           {bottomGrid.map((item, idx) => (
             <div key={item._id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="relative h-64 overflow-hidden">
                   <img src={`http://localhost:8080/assets/${item.images[0]}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <span className="absolute top-4 left-4 bg-[#327878] text-white text-[8px] font-black uppercase px-3 py-1.5 rounded-full">New</span>
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                   <div className="flex justify-between items-start">
                      <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-[#327878] transition-colors">{item.title}</h4>
                      <span className="text-[#327878] font-black text-sm tracking-tight">${item.price.toLocaleString()}</span>
                   </div>
                   <div className="flex gap-4 text-gray-400 text-[9px] font-bold uppercase tracking-widest pt-2">
                      <span>{item.bedNum} BD</span>
                      <span>{item.bathNum} BA</span>
                      <span>{item.area} SQFT</span>
                   </div>
                   <div className="pt-6 mt-auto border-t border-gray-50 flex justify-between items-center">
                      <button className="text-[#327878] font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                        View Details <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <span className="bg-slate-50 text-slate-400 text-[8px] font-bold px-2 py-1 rounded">Exclusive</span>
                   </div>
                </div>
             </div>
           ))}
        </div>

      </ContentWrapper>
    </section>
  );
}