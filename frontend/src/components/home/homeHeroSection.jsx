import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../contentWrapper";

export default function HomeHeroSection() {
  return (
    <section className="bg-[#FBFCFC] pt-32 pb-20 overflow-hidden">
      <ContentWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#327878] text-white px-5 py-2.5 rounded-full shadow-lg shadow-[#327878]/20">
              <FontAwesomeIcon icon={faStar} className="text-[10px]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Properties</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Discover Your <br /> 
              <span className="text-[#327878]">Perfect Home</span> <br /> 
              in the City.
            </h1>

            <p className="text-gray-400 text-lg font-medium max-w-lg leading-relaxed">
              Browse thousands of verified luxury listings from our network of elite agents. Your dream residence is just one search away.
            </p>

            <form className="bg-white p-8 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 space-y-5 max-w-xl">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Location</label>
                <input 
                  type="text" 
                  placeholder="Enter city, neighborhood or zip..."
                  className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Property Type</label>
                  <div className="relative">
                    <select className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-6 py-4 text-sm appearance-none focus:outline-none focus:border-[#327878] cursor-pointer">
                      <option>Select Type</option>
                      <option>Modern Villa</option>
                      <option>Penthouse</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Price Range</label>
                  <div className="relative">
                    <select className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-6 py-4 text-sm appearance-none focus:outline-none focus:border-[#327878] cursor-pointer">
                      <option>Price Range</option>
                      <option>$500k - $1M</option>
                      <option>$1M - $5M</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Bedrooms</label>
                  <div className="relative">
                    <select className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-6 py-4 text-sm appearance-none focus:outline-none focus:border-[#327878] cursor-pointer">
                      <option>Bedrooms</option>
                      <option>3+</option>
                      <option>5+</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Bathrooms</label>
                  <div className="relative">
                    <select className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-6 py-4 text-sm appearance-none focus:outline-none focus:border-[#327878] cursor-pointer">
                      <option>Bathrooms</option>
                      <option>2+</option>
                      <option>4+</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none" />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#327878] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-[#327878]/20 flex items-center justify-center gap-3 group">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="group-hover:scale-110 transition-transform" />
                Search Properties
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 relative mt-20 lg:mt-0">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl z-10 aspect-[4/3]">
               <img 
                 src="/heroSectionSoldHouse.png" 
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                 alt="Luxury Exterior"
               />
               
               <div className="absolute top-8 right-8 bg-white px-6 py-4 rounded-3xl shadow-xl z-20">
                  <p className="text-[#327878] font-black text-2xl tracking-tighter">$850,000</p>
                  <p className="text-gray-300 font-black uppercase text-[9px] tracking-widest">Featured Property</p>
               </div>
            </div>

            <div className="absolute -top-16 -left-12 w-64 h-64 rounded-[2rem] border-[12px] border-white shadow-2xl overflow-hidden z-20 hidden md:block">
               <img 
                 src="/home-interior.png" 
                 className="w-full h-full object-cover"
                 alt="Luxury Interior"
               />
            </div>

            <div className="absolute -bottom-10 left-10 bg-white p-5 rounded-[2rem] shadow-2xl z-30 flex items-center gap-4 border border-gray-50 min-w-[280px]">
               <img 
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                 className="w-14 h-14 rounded-2xl object-cover"
                 alt="Sarah Johnson"
               />
               <div>
                  <h4 className="font-black text-slate-900 text-sm">Sarah Johnson</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Top Real Estate Agent</p>
                  <div className="flex text-yellow-400 text-[9px] mt-1 gap-0.5">
                    {[...Array(5)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                    <span className="text-gray-300 ml-2 font-bold italic underline">4.9 (127 reviews)</span>
                  </div>
               </div>
            </div>
            
            <div className="absolute -z-0 -bottom-20 -right-20 w-80 h-80 bg-[#327878]/5 rounded-full blur-3xl"></div>
          </div>

        </div>
      </ContentWrapper>
    </section>
  );
}