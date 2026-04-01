import ContentWrapper from "../../contentWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCheckCircle, faArrowRight, faHeadset, faAward } from "@fortawesome/free-solid-svg-icons";

export default function AboutUs() {
  
  const stats = [
    { label: "Properties Listed", value: "2800+" },
    { label: "Success Rate", value: "95%" },
    { label: "Client Support", value: "24/7" }
  ];

  const benefits = [
    "Expert market analysis and pricing strategies",
    "Personalized property matching services",
    "Professional photography and virtual tours"
  ];

  return (
    <section className=" bg-white overflow-hidden">
      <ContentWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* LEVA STRANA: Sadržaj i Brojevi */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#327878]/10 text-[#327878] px-5 py-2.5 rounded-full">
                <FontAwesomeIcon icon={faBuilding} className="text-[10px]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Real Estate</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                Transforming Real Estate <br /> Dreams Into Reality
              </h2>

              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* STATS GRID (Tvoj Numbers komponent) */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#FBFCFC] border border-gray-50 rounded-[2rem] p-8 text-center shadow-sm">
                  <h4 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* BENEFITS LIST */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#327878] text-lg" />
                  {benefit}
                </div>
              ))}
            </div>

            {/* CTA & SUPPORT */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <button className="bg-[#327878] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-[#327878]/20 flex items-center gap-3 group">
                Learn More About Us
                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FBFCFC] border border-gray-100 flex items-center justify-center text-[#327878] shadow-sm">
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Need assistance?</p>
                  <p className="text-sm font-black text-slate-900">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>
          </div>

          {/* DESNA STRANA: Image Collage */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6">
              
              {/* Velika slika (Gore) */}
              <div className="col-span-2 relative">
                <img 
                  src="/property-exterior-pool.webp" 
                  className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl"
                  alt="Modern Mansion"
                />
                
                {/* Awards Badge */}
                <div className="absolute bottom-10 right-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-50 flex items-center gap-4 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-[#327878] flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faAward} size="lg" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xl tracking-tighter">12+</h4>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Awards Won</p>
                  </div>
                </div>
              </div>

              {/* Mala slika 1 (Unutrašnjost) */}
              <div className="relative h-60">
                <img 
                  src="/property-interior-8.webp" 
                  className="w-full h-full object-cover rounded-[2.5rem] shadow-xl"
                  alt="Interior"
                />
              </div>

              {/* Mala slika 2 (Agent/Consultation) */}
              <div className="relative h-60">
                <img 
                  src="/agent-3.webp" 
                  className="w-full h-full object-cover rounded-[2.5rem] shadow-xl"
                  alt="Consultation"
                />
              </div>

            </div>

            {/* Dekorativni element u pozadini */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-[#327878]/5 rounded-full blur-3xl"></div>
          </div>

        </div>
      </ContentWrapper>
    </section>
  );
}