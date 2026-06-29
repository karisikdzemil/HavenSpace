import { useState } from "react";
import { API_BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faEnvelope, faLock, faBriefcase, faLocationDot,
  faPhone, faLanguage, faImage, faCircleExclamation, faArrowRight, faPenNib
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const INITIAL_FORM = {
  name: "", surname: "", email: "", password: "", confirmPassword: "",
  position: "", description: "", phone: "", location: "",
  linkedin: "", instagram: "", facebook: "", languages: "",
};


const Field = ({ label, name, type = "text", icon, placeholder, error, grid = "col-span-2", value, onChange }) => (
  <div className={`space-y-1.5 ${grid}`}>
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
        <FontAwesomeIcon icon={icon} size="xs" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#FBFCFC] border ${error ? "border-red-300" : "border-gray-100"} rounded-2xl pl-11 pr-4 py-3.5 text-[13px] focus:outline-none focus:border-[#327878] focus:bg-white transition-all`}
      />
    </div>
    {error && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
  </div>
);

// ─── Glavna komponenta ────────────────────────────────────────────────────────

export default function Signup() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    const { name, surname, email, password, confirmPassword, position, description, phone, location, linkedin } = form;

    if (!name || name.trim().length < 2)
      errs.name = "Name must have at least 2 characters.";

    if (!surname || surname.trim().length < 2)
      errs.surname = "Surname must have at least 2 characters.";

    if (!email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Please enter a valid email.";

    if (!password) errs.password = "Password is required.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters long.";

    if (!confirmPassword) errs.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password) errs.confirmPassword = "Passwords do not match.";

    if (!position || position.trim() === "")
      errs.position = "Position is required.";

    if (!description || description.trim().length < 10)
      errs.description = "Description must be at least 10 characters.";

    if (!phone || phone.trim() === "")
      errs.phone = "Phone number is required.";

    if (!location || location.trim() === "")
      errs.location = "Location is required.";

    if (linkedin && linkedin.trim() !== "") {
      try { new URL(linkedin); } catch { errs.linkedin = "LinkedIn must be a valid URL."; }
    }

    return errs;
  };

  const mapApiErrors = (apiErrors = []) => {
    const errs = {};
    apiErrors.forEach((err) => { errs[err.path || err.field || "general"] = err.msg; });
    return errs;
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    const frontendErrors = validate();
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Koristimo FormData zbog avatar file uploada
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val.trim() !== "") formData.append(key, val);
    });

    // Avatar — uzimamo iz file inputa
    const fileInput = document.querySelector('input[name="avatar"]');
    if (fileInput?.files?.length) {
      formData.append("avatar", fileInput.files[0]);
    }

    try {
      const result = await fetch(`${API_BASE_URL}/api/create-user`, {
        method: "POST",
        body: formData,
      });
      const data = await result.json();
      if (!result.ok) {
        setErrors(data.errors ? mapApiErrors(data.errors) : { general: data.message });
        setIsLoading(false);
        return;
      }
      login(data.user, data.token);
      navigate("/");
    } catch {
      setErrors({ general: "Server connection failed." });
      setIsLoading(false);
    }
  };

  return (
    <form className="p-10 space-y-8" onSubmit={signupHandler}>

      {/* BASIC */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <Field label="First Name" name="name" icon={faUser} placeholder="Name" grid="col-span-1" value={form.name} onChange={set("name")} error={errors.name} />
        <Field label="Last Name" name="surname" icon={faUser} placeholder="Surname" grid="col-span-1" value={form.surname} onChange={set("surname")} error={errors.surname} />
        <Field label="Email" name="email" type="email" icon={faEnvelope} placeholder="name@haven.com" value={form.email} onChange={set("email")} error={errors.email} />
        <Field label="Password" name="password" type="password" icon={faLock} placeholder="••••••••" grid="col-span-1" value={form.password} onChange={set("password")} error={errors.password} />
        <Field label="Confirm Password" name="confirmPassword" type="password" icon={faLock} placeholder="••••••••" grid="col-span-1" value={form.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword} />
      </div>

      {/* PROFESSIONAL */}
      <div className="pt-6 border-t border-gray-50 grid grid-cols-2 gap-x-6 gap-y-5">
        <Field label="Title / Position" name="position" icon={faBriefcase} placeholder="Senior Real Estate Agent" value={form.position} onChange={set("position")} error={errors.position} />
        <Field label="Location" name="location" icon={faLocationDot} placeholder="Belgrade, RS" grid="col-span-1" value={form.location} onChange={set("location")} error={errors.location} />
        <Field label="Phone Number" name="phone" icon={faPhone} placeholder="+381 6..." grid="col-span-1" value={form.phone} onChange={set("phone")} error={errors.phone} />
        <Field label="Languages" name="languages" icon={faLanguage} placeholder="English, Serbian, German" value={form.languages} onChange={set("languages")} />

        <div className="col-span-2 space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">About Profile</label>
          <div className="relative group">
            <div className="absolute top-4 left-4 text-gray-300 group-focus-within:text-[#327878] transition-colors">
              <FontAwesomeIcon icon={faPenNib} size="xs" />
            </div>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={set("description")}
              placeholder="Write a short bio..."
              className={`w-full bg-[#FBFCFC] border ${errors.description ? "border-red-300" : "border-gray-100"} rounded-2xl pl-11 pr-4 py-3.5 text-xs focus:outline-none focus:border-[#327878] transition-all resize-none`}
            />
          </div>
          {errors.description && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{errors.description}</p>}
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

      {/* SOCIAL */}
      <div className="pt-6 border-t border-gray-50">
        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#327878] block mb-4 text-center italic">Social Network Links</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { field: "linkedin", icon: faLinkedinIn, placeholder: "LinkedIn URL" },
            { field: "instagram", icon: faInstagram, placeholder: "Instagram URL" },
            { field: "facebook", icon: faFacebookF, placeholder: "Facebook URL" },
          ].map((s) => (
            <div key={s.field} className="space-y-1.5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
                  <FontAwesomeIcon icon={s.icon} size="xs" />
                </div>
                <input
                  name={s.field}
                  value={form[s.field]}
                  onChange={set(s.field)}
                  placeholder={s.placeholder}
                  className={`w-full bg-[#FBFCFC] border ${errors[s.field] ? "border-red-300" : "border-gray-100"} rounded-xl pl-9 pr-2 py-3 text-[11px] focus:outline-none focus:border-[#327878] transition-all`}
                />
              </div>
              {errors[s.field] && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{errors[s.field]}</p>}
            </div>
          ))}
        </div>
      </div>

      {errors.general && (
        <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-wider">
          <FontAwesomeIcon icon={faCircleExclamation} /> {errors.general}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#327878] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-200"
      >
        {isLoading ? <Loading /> : (
          <>
            Create Professional Account
            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}