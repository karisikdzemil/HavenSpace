import { useState } from "react";
import Loading from "../loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, faEnvelope, faLock, faBriefcase, faLocationDot, 
  faPhone, faLanguage, faImage, faCircleExclamation, faArrowRight, faPenNib
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Signup() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = (email, password, confirmPassword) => {
    const errs = {};
    if (!email) errs.email = "Required";
    if (!password) errs.password = "Required";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords mismatch";
    return errs;
  };

  const mapApiErrors = (apiErrors = []) => {
    const errs = {};
    apiErrors.forEach((err) => { errs[err.path || "general"] = err.msg; });
    return errs;
  };

  const singupHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const frontendErrors = validate(formData.get("email"), formData.get("password"), formData.get("confirmPassword"));
    
    if (Object.keys(frontendErrors).length > 0) { setErrors(frontendErrors); return; }

    setErrors({});
    setIsLoading(true);
    try {
      const result = await fetch("http://localhost:8080/api/create-user", { method: "POST", body: formData });
      const data = await result.json();
      if (!result.ok) { setErrors(mapApiErrors(data.errors)); setIsLoading(false); return; }
      login(data.user, data.token);
      navigate('/');
    } catch (err) { setIsLoading(false); }
  };

  const Input = ({ label, name, type = "text", icon, placeholder, error, grid = "col-span-2" }) => (
    <div className={`space-y-1.5 ${grid}`}>
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
          <FontAwesomeIcon icon={icon} size="xs" />
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full bg-[#FBFCFC] border ${error ? 'border-red-300' : 'border-gray-100'} rounded-2xl pl-11 pr-4 py-3.5 text-[13px] focus:outline-none focus:border-[#327878] focus:bg-white transition-all`}
        />
      </div>
      {error && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
    </div>
  );

  return (
    <form className="p-10 space-y-8" onSubmit={singupHandler}>
      {/* SECTION: BASIC */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <Input label="First Name" name="name" icon={faUser} placeholder="Jamil" grid="col-span-1" />
        <Input label="Last Name" name="surname" icon={faUser} placeholder="Karishik" grid="col-span-1" />
        <Input label="Email" name="email" type="email" icon={faEnvelope} placeholder="jamil@haven.com" error={errors.email} />
        <Input label="Password" name="password" type="password" icon={faLock} placeholder="••••••••" error={errors.password} grid="col-span-1" />
        <Input label="Confirm" name="confirmPassword" type="password" icon={faLock} placeholder="••••••••" error={errors.confirmPassword} grid="col-span-1" />
      </div>

      {/* SECTION: PROFESSIONAL */}
      <div className="pt-6 border-t border-gray-50 grid grid-cols-2 gap-x-6 gap-y-5">
        <Input label="Title / Position" name="position" icon={faBriefcase} placeholder="Senior Real Estate Agent" />
        <Input label="Location" name="location" icon={faLocationDot} placeholder="Belgrade, RS" grid="col-span-1" />
        <Input label="Phone Number" name="phone" icon={faPhone} placeholder="+381 6..." grid="col-span-1" />
        <Input label="Languages" name="languages" icon={faLanguage} placeholder="English, Serbian, German" />
        
        <div className="col-span-2 space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">About Profile</label>
          <div className="relative">
            <div className="absolute top-4 left-4 text-gray-300"><FontAwesomeIcon icon={faPenNib} size="xs" /></div>
            <textarea name="description" rows="3" placeholder="Write a short bio..." className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-xs focus:outline-none focus:border-[#327878] transition-all resize-none"></textarea>
          </div>
        </div>

        <div className="col-span-2 space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Avatar Image</label>
          <label className="flex items-center gap-3 w-full bg-[#f0f7f7] border border-dashed border-[#327878]/30 rounded-2xl px-5 py-4 cursor-pointer hover:bg-[#e8f2f2] transition-colors">
            <FontAwesomeIcon icon={faImage} className="text-[#327878]" />
            <span className="text-[11px] font-bold text-[#327878]">Select profile picture...</span>
            <input type="file" name="avatar" className="hidden" />
          </label>
        </div>
      </div>

      {/* SECTION: SOCIAL */}
      <div className="pt-6 border-t border-gray-50">
        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#327878] block mb-4 text-center italic">Social Network Links</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { n: 'linkedin', i: faLinkedinIn, p: 'LinkedIn' },
            { n: 'instagram', i: faInstagram, p: 'Instagram' },
            { n: 'facebook', i: faFacebookF, p: 'Facebook' }
          ].map(s => (
            <div key={s.n} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878]"><FontAwesomeIcon icon={s.i} size="xs" /></div>
              <input name={s.n} placeholder={s.p} className="w-full bg-[#FBFCFC] border border-gray-100 rounded-xl pl-9 pr-2 py-3 text-[11px] focus:outline-none focus:border-[#327878] transition-all" />
            </div>
          ))}
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#327878] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-200">
        {isLoading ? <Loading /> : (
          <>Create Professional Account <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" /></>
        )}
      </button>
    </form>
  );
}