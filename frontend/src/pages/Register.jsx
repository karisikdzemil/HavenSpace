import { useState } from "react";
import Login from "../components/register/Login";
import Signup from "../components/register/SignUp";

export default function Register() {
  const [registerType, setRegisterType] = useState("login");

  const changeTypeHandler = () => {
    setRegisterType(prevType => prevType === 'login' ? 'signup' : 'login');
  }

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* LEVA STRANA - Fixed Desktop visual */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-[#327878]">
        <img 
          src="/luxury-interior.jpg" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          alt="Luxury Interior"
        />
        <div className="relative z-10 flex flex-col justify-end p-20 w-full h-full bg-gradient-to-t from-black/60 to-transparent">
          <div className="mb-8">
             <span className="text-white font-black tracking-[0.3em] uppercase text-[10px] border border-white/40 px-5 py-2.5 rounded-full backdrop-blur-md">
               Elite Properties Only
             </span>
          </div>
          <h2 className="text-6xl font-black text-white mb-6 leading-[1.1]">
            Experience <br /> Exceptional.
          </h2>
          <p className="text-white/70 text-lg max-w-sm font-light leading-relaxed">
            Join the most exclusive real estate network. Connect with verified agents and discover homes that match your lifestyle.
          </p>
        </div>
      </div>

      {/* DESNA STRANA - Scrollable Form area */}
      <div className="w-full lg:w-7/12 xl:w-1/2 h-screen overflow-y-auto bg-[#FBFCFC] pt-32 pb-20 px-8 md:px-20 lg:px-24">
        <div className="w-full max-w-2xl mx-auto"> {/* Povećana širina sa max-w-md na max-w-2xl */}
          
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
              {registerType === "login" ? 'Welcome Back' : 'Join the Collective'}
            </h1>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-md">
              {registerType === "login" 
                ? 'Sign in to access your dashboard and manage your property portfolio.' 
                : 'Create your professional profile to start listing and connecting with premium buyers worldwide.'}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden mb-10">
            <div className="h-2 w-full bg-[#327878]" />
            {registerType === "login" ? <Login /> : <Signup />}
          </div>

          {/* Switcher Toggle */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4 w-full opacity-30">
              <div className="h-px bg-gray-400 flex-1"></div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em]">Account Access</p>
              <div className="h-px bg-gray-400 flex-1"></div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400 font-medium">
                {registerType === "login" ? "Don't have an account yet?" : "Already a member of HavenSpace?"}
              </span>
              <button
                onClick={changeTypeHandler}
                className="text-[#327878] font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-4"
              >
                {registerType === "login" ? "Get Started" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}