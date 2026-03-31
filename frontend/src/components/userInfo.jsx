import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function UserInfo({ agent }) {
  if (!agent) return null;

  return (
    <div className="w-full bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-10 flex flex-col lg:flex-row gap-12 items-center lg:items-start relative overflow-hidden">
      {/* Dekorativni badge u uglu */}
      <div className="absolute top-0 right-0 bg-[#327878] text-white px-8 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">
        Official Agent
      </div>

      {/* Slika agenta */}
      <div className="relative shrink-0">
        <img
          className="w-64 h-80 object-cover rounded-[2.5rem] shadow-2xl shadow-slate-200"
          src={`http://localhost:8080/assets/${agent.avatar}`}
          alt={`${agent.name} profile`}
        />
        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-lg flex gap-3 text-slate-400">
           <a href={agent.linkedin} className="hover:text-[#327878] transition-colors"><FontAwesomeIcon icon={faLinkedinIn} size="xs" /></a>
           <a href={agent.instagram} className="hover:text-[#327878] transition-colors"><FontAwesomeIcon icon={faInstagram} size="xs" /></a>
        </div>
      </div>

      {/* Detalji */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
            {agent.name} {agent.surname}
          </h1>
          <p className="text-[#327878] font-black uppercase tracking-[0.2em] text-[11px]">
            {agent.position || "Senior Real Estate Advisor"}
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="text-gray-400 text-sm leading-relaxed italic">
            "{agent.description || "No description provided. Expert in luxury real estate and premium property management."}"
          </p>
        </div>

        {/* Statistika - Izvučeno iz Emily profil stila */}
        <div className="flex flex-wrap gap-10 justify-center lg:justify-start border-y border-gray-50 py-6">
          <div className="text-center lg:text-left">
            <p className="text-3xl font-black text-slate-900">{agent.soldProperties || 0}+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Properties Sold</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-3xl font-black text-slate-900">${agent.totalSales || "0"}M</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Total Sales</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-3xl font-black text-slate-900">{agent.yearsExperience || "5"}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Years Experience</p>
          </div>
        </div>

        {/* Kontakt info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
            <FontAwesomeIcon icon={faPhone} className="text-[#327878] w-4" />
            {agent.phone || "+1 (555) 000-000"}
          </div>
          <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
            <FontAwesomeIcon icon={faEnvelope} className="text-[#327878] w-4" />
            {agent.email}
          </div>
        </div>
      </div>

      {/* Akciono dugme */}
      <div className="lg:self-end">
        <a
          href={`/agents/${agent._id}`}
          className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#327878] transition-all group"
        >
          Public Profile
          <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}