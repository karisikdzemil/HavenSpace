import { useEffect, useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, faTag, faLocationDot, faInfoCircle, 
  faBed, faBath, faRulerCombined, faCar, faImages, 
  faCheckDouble, faMapPin, faArrowRight 
} from "@fortawesome/free-solid-svg-icons";

export default function AddProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/register"); // Vodimo ga na login/register ako nema tokena
    }
  }, [token, navigate]);

  const validate = (formData) => {
    const errs = {};
    const title = formData.get("title");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!title || title.length < 5) errs.title = "Title must be at least 5 characters!";
    if (!price || Number(price) <= 0) errs.price = "Price must be greater than 0!";
    if (!description || description.length < 25) errs.description = "Description is too short (min 25)!";

    return errs;
  };

  const addPropertyHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const frontendErrors = validate(formData);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = await fetch("http://localhost:8080/api/property", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await result.json();
      if (!result.ok) {
        setErrors(data.errors ? mapApiErrors(data.errors) : { general: data.message });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setErrors({ general: "Server connection failed." });
      setIsLoading(false);
    }
  };

  const mapApiErrors = (apiErrors = []) => {
    const errs = {};
    apiErrors.forEach((err) => {
      errs[err.field || "general"] = err.msg;
    });
    return errs;
  };

  const FormSection = ({ title, icon, children }) => (
    <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
        <div className="w-10 h-10 rounded-full bg-[#327878]/10 flex items-center justify-center text-[#327878]">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="font-black uppercase tracking-widest text-xs text-slate-800">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );

  const Input = ({ label, name, type = "text", placeholder, icon, error, step, multiple }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
          <FontAwesomeIcon icon={icon} size="sm" />
        </div>
        <input
          name={name}
          type={type}
          step={step}
          multiple={multiple}
          placeholder={placeholder}
          className={`w-full bg-[#FBFCFC] border ${error ? 'border-red-300' : 'border-gray-50'} rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#327878] focus:bg-white transition-all`}
        />
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
    </div>
  );

  return (
    <section className="min-h-screen bg-[#FBFCFC] pt-32 pb-20">
      <ContentWrapper>
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 flex flex-col">
            <span className="bg-[#327878] mx-auto w-[180px] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full">
              Listing Creator
            </span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Post a New Property</h1>
            <p className="text-gray-400 font-medium max-w-lg mx-auto">Fill in the details below to list your luxury property on HavenSpace. Quality listings get 4x more engagement.</p>
          </div>

          <form onSubmit={addPropertyHandler} className="space-y-8">
            
            {/* BASIC INFO */}
            <FormSection title="Basic Information" icon={faInfoCircle}>
              <div className="col-span-2">
                <Input label="Property Title" name="title" icon={faBuilding} placeholder="Modern Villa with Sea View" error={errors.title} />
              </div>
              <Input label="Asking Price ($)" name="price" type="number" icon={faTag} placeholder="850000" error={errors.price} />
              <Input label="Property Status" name="status" icon={faCheckDouble} placeholder="For Sale / For Rent" />
            </FormSection>

            {/* DETAILS */}
            <FormSection title="Property Details" icon={faBed}>
              <Input label="Property Type" name="type" icon={faBuilding} placeholder="Apartment, Villa, House" />
              <Input label="Total Area (sqft)" name="area" type="number" icon={faRulerCombined} placeholder="2450" />
              <Input label="Bedrooms" name="bedNum" type="number" icon={faBed} placeholder="4" />
              <Input label="Bathrooms" name="bathNum" type="number" icon={faBath} placeholder="3" />
              <Input label="Garage Slots" name="garage" type="number" icon={faCar} placeholder="2" />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Property Images</label>
                <label className="flex items-center gap-3 w-full bg-[#f0f7f7] border border-dashed border-[#327878]/30 rounded-2xl px-5 py-4 cursor-pointer hover:bg-[#e8f2f2] transition-colors">
                  <FontAwesomeIcon icon={faImages} className="text-[#327878]" />
                  <span className="text-xs font-bold text-[#327878]">Upload High-Res Photos (Multiple)</span>
                  <input type="file" name="images" multiple className="hidden" />
                </label>
              </div>
            </FormSection>

            {/* LOCATION */}
            <FormSection title="Location Tracking" icon={faMapPin}>
              <Input label="City" name="city" icon={faLocationDot} placeholder="Chicago, IL" />
              <Input label="Street Address" name="address" icon={faLocationDot} placeholder="1234 Maple Street" />
              <Input label="Latitude" name="lat" type="number" step="any" icon={faMapPin} placeholder="41.8781" />
              <Input label="Longitude" name="lng" type="number" step="any" icon={faMapPin} placeholder="-87.6298" />
            </FormSection>

            {/* DESCRIPTION & FEATURES */}
            <FormSection title="Amenities & Content" icon={faCheckDouble}>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <textarea 
                  name="description" 
                  rows="5" 
                  placeholder="Describe the unique features of this property..."
                  className="w-full bg-[#FBFCFC] border border-gray-50 rounded-2xl p-5 text-sm focus:outline-none focus:border-[#327878] transition-all resize-none"
                ></textarea>
                {errors.description && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.description}</p>}
              </div>
              <Input label="Interior Features" name="interiorFeatures" icon={faCheckDouble} placeholder="Pool, Gym, Smart Home" />
              <Input label="Exterior Features" name="exteriorFeatures" icon={faCheckDouble} placeholder="Garden, BBQ, Rooftop" />
            </FormSection>

            {errors.general && (
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest text-center">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#327878] transition-all duration-500 shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group"
            >
              {isLoading ? <Loading /> : (
                <>
                  Publish Listing Now
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </ContentWrapper>
    </section>
  );
}