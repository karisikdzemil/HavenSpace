import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot, faClock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import ContentWrapper from "../components/contentWrapper";

export default function Contact() {
  const contactHandler = (e) => {
    e.preventDefault();
    alert("Message sent! Our agents will contact you shortly.");
  };

  return (
    <section className="min-h-screen bg-[#FBFCFC] pt-36 pb-20">
      <ContentWrapper>
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER SEKCIJA */}
          <div className="text-center mb-16 space-y-4 flex flex-col">
            <span className="bg-[#327878] w-[180px] mx-auto text-white text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
              Let's Talk About <br /> Your Next Home.
            </h1>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">
              Whether you're looking to buy, sell, or just need expert advice, our team at HavenSpace is here to guide you through every step.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row bg-white rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden">
            
            {/* LEVA STRANA: INFO PANEL */}
            <div className="w-full lg:w-5/12 bg-[#327878] p-12 md:p-16 text-white flex flex-col justify-between">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-black mb-6 tracking-tight">Contact Information</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    Our team typically responds within 2 business hours. Visit our headquarters for a private consultation.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#327878] transition-all duration-300">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Call Us</p>
                      <p className="text-sm font-bold">+381 60 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#327878] transition-all duration-300">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Email Us</p>
                      <p className="text-sm font-bold">office@havenspace.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#327878] transition-all duration-300">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Visit Us</p>
                      <p className="text-sm font-bold">123 Luxury Ave, Belgrade, RS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL LINKS */}
              <div className="pt-12 flex gap-4">
                {[faLinkedinIn, faInstagram, faFacebookF, faTwitter].map((icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#327878] transition-all duration-300">
                    <FontAwesomeIcon icon={icon} size="sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* DESNA STRANA: FORMA */}
            <div className="w-full lg:w-7/12 p-12 md:p-16">
              <form onSubmit={contactHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                  <select className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all appearance-none cursor-pointer text-gray-500">
                    <option>Inquiry about property</option>
                    <option>Selling my property</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
                  <textarea 
                    rows="6" 
                    placeholder="Tell us how we can help..."
                    className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#327878] transition-all duration-300 shadow-xl shadow-slate-100 flex items-center justify-center gap-4 group"
                >
                  Send Message
                  <FontAwesomeIcon icon={faPaperPlane} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-gray-400 font-medium text-xs">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="text-[#327878]" />
              <span>Mon - Fri: 09:00 - 18:00</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="text-[#327878]" />
              <span>Sat: 10:00 - 14:00</span>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}