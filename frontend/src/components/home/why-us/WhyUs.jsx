import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faLocationDot, 
//   faShieldCheck, 
  faClock, 
  faUsers, 
  faGem 
} from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../../contentWrapper";

export default function WhyUs() {
  const features = [
    {
      icon: faLocationDot,
      title: "Prime Locations",
      desc: "Exclusive access to the most sought-after neighborhoods and emerging markets."
    },
    {
      icon: faUsers,
      title: "Guaranteed Results",
      desc: "Our proven track record ensures successful transactions and satisfied clients."
    },
    {
      icon: faClock,
      title: "Fast Processing",
      desc: "Streamlined processes and expert negotiation to close deals efficiently."
    },
    {
      icon: faUsers,
      title: "Expert Team",
      desc: "Certified professionals with deep market knowledge and client dedication."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <ContentWrapper>
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">Why Us</h2>
          <div className="w-20 h-1 bg-[#327878] mx-auto rounded-full"></div>
          <p className="text-gray-400 font-medium max-w-lg mx-auto">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* LEVA STRANA: Video Thumbnail & Badges */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Luxury Property Video"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border border-white/30">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#327878] shadow-xl">
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                  <span className="text-white font-black uppercase text-xs tracking-widest">Watch Our Story</span>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-10 -right-10 bg-[#327878] text-white p-8 rounded-[2rem] shadow-2xl z-20 text-center min-w-[160px]">
              <h4 className="text-3xl font-black tracking-tighter">15+</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Years Excellence</p>
            </div>

            <div className="absolute top-20 -right-10 bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl z-10 text-center min-w-[160px] border border-gray-50">
              <h4 className="text-3xl font-black tracking-tighter">3.2K</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Happy Clients</p>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2rem] shadow-2xl z-20 flex items-center gap-4 border border-gray-50 max-w-[280px]">
              <div className="w-12 h-12 rounded-xl bg-[#327878]/10 flex items-center justify-center text-[#327878]">
                <FontAwesomeIcon icon={faGem} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-sm">Premier Service</h5>
                <p className="text-gray-400 text-[10px] font-medium">Luxury real estate expertise since 2009</p>
              </div>
            </div>
          </div>

          {/* DESNA STRANA: Features & Stats */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#327878]/10 text-[#327878] px-5 py-2.5 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">★ Why Elite Properties</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                Your Gateway to Exceptional <br /> Real Estate Experiences
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 bg-[#327878]/10 rounded-xl flex items-center justify-center text-[#327878]">
                    <FontAwesomeIcon icon={f.icon} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 text-base">{f.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics Bottom Row */}
            <div className="bg-[#FBFCFC] border border-gray-100 rounded-[2.5rem] p-10 flex flex-wrap justify-between items-center gap-8 shadow-sm">
              <div className="text-center space-y-1">
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter">94</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">% Success Rate</p>
              </div>
              <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
              <div className="text-center space-y-1">
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter">1800</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">+ Properties Sold</p>
              </div>
              <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
              <div className="text-center space-y-1">
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter">24</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">/7 Support Available</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button className="bg-[#327878] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-[#327878]/20">
                Explore Properties
              </button>
              <button className="border-2 border-gray-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:border-[#327878] transition-all duration-500">
                Schedule Consultation
              </button>
            </div>
          </div>

        </div>
      </ContentWrapper>
    </section>
  );
}