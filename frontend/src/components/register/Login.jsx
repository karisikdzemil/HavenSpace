import { useState } from "react";
import Loading from "../loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faArrowRight, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = (email, password) => {
    const errs = {};
    if (!email) errs.email = "Email is required!";
    if (!password) errs.password = "Password is required!";
    return errs;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const frontendErrors = validate(email, password);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await result.json();
      if (!result.ok) {
        setErrors({ general: data.message || "Invalid credentials" });
        setIsLoading(false);
        return;
      }
      login(data.user, data.token);
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <form className="p-8 space-y-6" onSubmit={loginHandler}>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300">
            <FontAwesomeIcon icon={faEnvelope} size="sm" />
          </div>
          <input
            className={`w-full bg-[#FBFCFC] border ${errors.email ? 'border-red-300' : 'border-gray-50'} rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all`}
            type="email"
            placeholder="name@agency.com"
            name="email"
          />
        </div>
        {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Password</label>
            <span className="text-[9px] font-black text-[#327878] uppercase tracking-widest cursor-pointer hover:underline">Forgot?</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300">
            <FontAwesomeIcon icon={faLock} size="sm" />
          </div>
          <input
            className={`w-full bg-[#FBFCFC] border ${errors.password ? 'border-red-300' : 'border-gray-50'} rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all`}
            type="password"
            placeholder="••••••••"
            name="password"
          />
        </div>
        {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password}</p>}
      </div>

      {errors.general && (
        <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-wider">
          <FontAwesomeIcon icon={faCircleExclamation} /> {errors.general}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#327878] transition-all duration-300 flex items-center justify-center gap-3 group"
      >
        {isLoading ? <Loading /> : (
          <>
            Sign Into Account
            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}