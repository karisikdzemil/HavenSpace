import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUserCheck, faCircleCheck, faHome, faTrophy, faStar } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../contentWrapper";

export default function PerfectInvestment() {
  return (
    <section className="bg-[#f0f7f7]">
        <ContentWrapper>
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="flex flex-col justify-center">
          <span className="inline-block self-start bg-[#d7ebeb] text-[#286161] text-xs font-bold px-4 py-1.5 rounded-md tracking-wide mb-6">
            Your Property Journey Starts Here
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Ready to Find Your <br />
            <span className="text-[#327878]">Perfect Investment?</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
            cubilia curae; Mauris viverra veniam sit amet lacus cursus. Sed ut perspiciatis 
            unde omnis iste natus error sit voluptatem.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCircleCheck} className="text-[#327878] text-lg" />
              <span className="text-sm font-bold text-slate-800 tracking-wide">
                Expert market analysis and insights
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCircleCheck} className="text-[#327878] text-lg" />
              <span className="text-sm font-bold text-slate-800 tracking-wide">
                Personalized property recommendations
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCircleCheck} className="text-[#327878] text-lg" />
              <span className="text-sm font-bold text-slate-800 tracking-wide">
                End-to-end transaction support
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button className="inline-flex items-center gap-2 bg-[#327878] hover:bg-[#286161] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-[#327878]/10">
              <FontAwesomeIcon icon={faUserCheck} />
              Get Free Consultation
            </button>
            <a 
              href="tel:5551234567" 
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#327878] text-[#327878] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              <FontAwesomeIcon icon={faPhone} />
              Call (555) 123-4567
            </a>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[540px] aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" 
              alt="Perfect Investment House"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md">
              <FontAwesomeIcon icon={faStar} className="text-[#f1c40f] text-sm" />
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                Trusted by 500+ Clients
              </span>
            </div>
          </div>

          <div className="absolute -bottom-4 right-12 md:right-20 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)] border border-slate-50 w-52 transform translate-y-20">
            <div className="w-12 h-12 rounded-xl bg-[#e6f2f2] text-[#327878] flex items-center justify-center text-lg">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 leading-none">850+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">Properties Sold</p>
            </div>
          </div>

          <div className="absolute -bottom-8 right-4 md:right-8 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)] border border-slate-50 w-52">
            <div className="w-12 h-12 rounded-xl bg-[#e6f2f2] text-[#327878] flex items-center justify-center text-lg">
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 leading-none">15</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-1">Years Experience</p>
            </div>
          </div>

        </div>

      </div>
      </ContentWrapper>
    </section>
  );
}