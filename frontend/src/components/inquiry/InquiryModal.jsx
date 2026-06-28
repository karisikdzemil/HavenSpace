import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane, faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../config/api";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../loading/Loading";

const TITLES = {
  tour: "Schedule a Tour",
  info: "Request Information",
  consultation: "Get Free Consultation",
  contact: "Send a Message",
};

export default function InquiryModal({ open, onClose, type = "contact", propertyId, ownerId }) {
  const { user } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({
    name: user?.name ? `${user.name} ${user.surname || ""}`.trim() : "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required.";
    if (!form.message || form.message.trim().length < 5) errs.message = "Message must be at least 5 characters.";
    return errs;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const frontendErrors = validate();
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const result = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type, propertyId, ownerId }),
      });
      const data = await result.json();

      if (!result.ok) {
        toast.error(data.message || "Could not send your message.");
        setIsLoading(false);
        return;
      }

      toast.success("Message sent! The agent will get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
      onClose();
    } catch {
      toast.error("Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-4xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition">
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h3 className="text-2xl font-black text-slate-900 mb-1">{TITLES[type] || TITLES.contact}</h3>
            <p className="text-gray-400 text-sm font-medium mb-8">We'll get back to you as soon as possible.</p>

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-1.5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                    <FontAwesomeIcon icon={faUser} size="sm" />
                  </div>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full Name"
                    className={`w-full bg-[#FBFCFC] border ${errors.name ? "border-red-300" : "border-gray-100"} rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#327878] transition-all`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                    <FontAwesomeIcon icon={faEnvelope} size="sm" />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Email Address"
                    className={`w-full bg-[#FBFCFC] border ${errors.email ? "border-red-300" : "border-gray-100"} rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#327878] transition-all`}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                  <FontAwesomeIcon icon={faPhone} size="sm" />
                </div>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="Phone (optional)"
                  className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#327878] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <textarea
                  rows="4"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Your message..."
                  className={`w-full bg-[#FBFCFC] border ${errors.message ? "border-red-300" : "border-gray-100"} rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#327878] transition-all resize-none`}
                />
                {errors.message && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#327878] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#286161] transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? <Loading /> : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
