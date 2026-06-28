import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import Loading from "../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft, faPaperPlane, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email!");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const result = await fetch(`${API_BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await result.json();
      setIsSent(true);
    } catch {
      setError("Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FBFCFC] pt-24 pb-20 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="h-2 w-full bg-[#327878]" />
          <div className="p-10 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Reset Password</h1>
              <p className="text-gray-400 font-medium text-sm">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            {isSent ? (
              <div className="bg-[#f0f7f7] rounded-2xl p-6 text-center space-y-3">
                <FontAwesomeIcon icon={faCircleCheck} className="text-[#327878] text-3xl" />
                <p className="text-sm font-bold text-slate-700">
                  If an account with that email exists, a reset link has been sent.
                </p>
              </div>
            ) : (
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
                      <FontAwesomeIcon icon={faEnvelope} size="sm" />
                    </div>
                    <input
                      className={`w-full bg-[#FBFCFC] border ${error ? "border-red-300" : "border-gray-50"} rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#327878] transition-all`}
                      type="email"
                      placeholder="name@agency.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#327878] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isLoading ? <Loading /> : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}

            <Link to="/register" className="flex items-center justify-center gap-2 text-[#327878] font-black text-xs uppercase tracking-widest hover:underline pt-2">
              <FontAwesomeIcon icon={faArrowLeft} size="xs" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
