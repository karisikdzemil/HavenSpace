import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import ContentWrapper from "../components/contentWrapper";
import Reveal, { RevealGroup, RevealItem } from "../components/motion/Reveal";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding, faTag, faLocationDot, faInfoCircle,
  faBed, faBath, faRulerCombined, faCar, faImages,
  faCheckDouble, faMapPin, faArrowRight, faXmark, faPlus
} from "@fortawesome/free-solid-svg-icons";

const INITIAL_FORM = {
  title: "", price: "", status: "", type: "",
  area: "", bedNum: "", bathNum: "", garage: "",
  city: "", address: "", lat: "", lng: "",
  description: "", interiorInput: "", exteriorInput: "",
};


const FormSection = ({ title, icon, children }) => (
  <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm space-y-6">
    <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
      <div className="w-10 h-10 rounded-full bg-[#327878]/10 flex items-center justify-center text-[#327878]">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="font-black uppercase tracking-widest text-xs text-slate-800">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const Input = ({ label, type = "text", placeholder, icon, error, step, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
        <FontAwesomeIcon icon={icon} size="sm" />
      </div>
      <input
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#FBFCFC] border ${error ? "border-red-300" : "border-gray-50"} rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#327878] focus:bg-white transition-all`}
      />
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
  </div>
);

const Select = ({ label, icon, options, placeholder, error, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors z-10">
        <FontAwesomeIcon icon={icon} size="sm" />
      </div>
      <select
        value={value}
        onChange={onChange}
        className={`w-full bg-[#FBFCFC] border ${error ? "border-red-300" : "border-gray-50"} rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#327878] focus:bg-white transition-all appearance-none cursor-pointer`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
  </div>
);

const TagInput = ({ label, inputValue, onInputChange, onKeyDown, onAdd, tags, onRemove, error }) => (
  <div className="col-span-2 space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <div className={`w-full bg-[#FBFCFC] border ${error ? "border-red-300" : "border-gray-50"} rounded-2xl p-4 focus-within:border-[#327878] focus-within:bg-white transition-all`}>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-2 bg-[#327878]/10 text-[#327878] text-[11px] font-bold px-3 py-1.5 rounded-full">
              {tag}
              <button type="button" onClick={() => onRemove(i)} className="hover:text-red-500 transition-colors">
                <FontAwesomeIcon icon={faXmark} size="xs" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder="Type feature and press Enter or click +"
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-300"
        />
        <button
          type="button"
          onClick={onAdd}
          className="w-7 h-7 rounded-full bg-[#327878] text-white flex items-center justify-center hover:bg-slate-900 transition-colors shrink-0"
        >
          <FontAwesomeIcon icon={faPlus} size="xs" />
        </button>
      </div>
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
  </div>
);


const MAX_IMAGES = 20;

export default function AddProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(INITIAL_FORM);
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/register");
  }, [token, navigate]);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    const { title, price, city, address, lat, lng, description, type, bedNum, bathNum, area, garage } = form;

    if (!title || title.trim().length < 5)
      errs.title = "The name must be longer than 5 letters!";

    if (!price || isNaN(Number(price)) || !Number.isInteger(Number(price)) || Number(price) <= 0)
      errs.price = "The value must be a number greater than 0!";

    if (!city || city.trim() === "")
      errs.city = "City is required!";

    if (!address || address.trim() === "")
      errs.address = "Address is required!";

    if (!lat || lat === "")
      errs.lat = "Latitude is required!";
    else if (isNaN(Number(lat)) || Number(lat) < -90 || Number(lat) > 90)
      errs.lat = "Latitude must be between -90 and 90";

    if (!lng || lng === "")
      errs.lng = "Longitude is required!";
    else if (isNaN(Number(lng)) || Number(lng) < -180 || Number(lng) > 180)
      errs.lng = "Longitude must be between -180 and 180";

    if (!description || description.length < 25)
      errs.description = "The description must be longer than 25 letters!";

    if (!type || !["house", "apartment"].includes(type))
      errs.type = "Type must be either house or apartment";

    if (!bedNum || bedNum === "")
      errs.bedNum = "Bedroom number is required!";
    else if (isNaN(Number(bedNum)) || !Number.isInteger(Number(bedNum)) || Number(bedNum) <= 0)
      errs.bedNum = "The value must be a number greater than 0!";

    if (!bathNum || bathNum === "")
      errs.bathNum = "Bathroom number is required!";
    else if (isNaN(Number(bathNum)) || !Number.isInteger(Number(bathNum)) || Number(bathNum) <= 0)
      errs.bathNum = "The value must be a number greater than 0!";

    if (!area || area === "")
      errs.area = "Property area is required!";
    else if (isNaN(Number(area)) || !Number.isInteger(Number(area)) || Number(area) <= 0)
      errs.area = "The value must be a number greater than 0!";

    if (garage !== "" && isNaN(Number(garage)))
      errs.garage = "Value must be a number!";

    const badInterior = interiorFeatures.find((f) => f.length < 3 || f.length > 30);
    if (badInterior)
      errs.interiorFeatures = "Each interior feature must be between 3-30 characters!";

    const badExterior = exteriorFeatures.find((f) => f.length < 3 || f.length > 30);
    if (badExterior)
      errs.exteriorFeatures = "Each exterior feature must be between 3-30 characters!";

    return errs;
  };

  const addTag = (type) => {
    const value = type === "interior" ? form.interiorInput.trim() : form.exteriorInput.trim();
    if (!value) return;
    if (type === "interior") {
      setInteriorFeatures((prev) => [...prev, value]);
      setForm((prev) => ({ ...prev, interiorInput: "" }));
    } else {
      setExteriorFeatures((prev) => [...prev, value]);
      setForm((prev) => ({ ...prev, exteriorInput: "" }));
    }
  };

  const removeTag = (type, index) => {
    if (type === "interior")
      setInteriorFeatures((prev) => prev.filter((_, i) => i !== index));
    else
      setExteriorFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const imagesChangeHandler = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > MAX_IMAGES) {
      setErrors((prev) => ({ ...prev, images: `You can upload up to ${MAX_IMAGES} images.` }));
      setImages(files.slice(0, MAX_IMAGES));
      return;
    }
    setErrors((prev) => ({ ...prev, images: undefined }));
    setImages(files);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addPropertyHandler = async (e) => {
    e.preventDefault();

    const frontendErrors = validate();
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("status", form.status);
    formData.append("type", form.type);
    formData.append("area", form.area);
    formData.append("bedNum", form.bedNum);
    formData.append("bathNum", form.bathNum);
    formData.append("garage", form.garage || "0");
    formData.append("city", form.city);
    formData.append("address", form.address);
    formData.append("lat", form.lat);
    formData.append("lng", form.lng);
    formData.append("description", form.description);
    interiorFeatures.forEach((f) => formData.append("interiorFeatures", f));
    exteriorFeatures.forEach((f) => formData.append("exteriorFeatures", f));

    if (images.length) {
      images.forEach((file) => formData.append("images", file));
    }

    try {
      const result = await fetch(`${API_BASE_URL}/api/property`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await result.json();
      if (!result.ok) {
        setErrors(data.errors ? mapApiErrors(data.errors) : { general: data.message });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setErrors({ general: "Server connection failed." + err });
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

  return (
    <section className="min-h-screen bg-[#FBFCFC] pt-32 pb-20">
      <ContentWrapper>
        <div className="max-w-5xl mx-auto space-y-12">

          <Reveal className="text-center space-y-4 flex flex-col">
            <span className="bg-[#327878] mx-auto w-[180px] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full">
              Listing Creator
            </span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Post a New Property</h1>
            <p className="text-gray-400 font-medium max-w-lg mx-auto">
              Fill in the details below to list your luxury property on HavenSpace. Quality listings get 4x more engagement.
            </p>
          </Reveal>

          <form onSubmit={addPropertyHandler} className="space-y-8">
          <RevealGroup className="space-y-8" staggerDelay={0.1}>

            <RevealItem>
            <FormSection title="Basic Information" icon={faInfoCircle}>
              <div className="col-span-2">
                <Input label="Property Title" value={form.title} onChange={set("title")} icon={faBuilding} placeholder="Modern Villa with Sea View" error={errors.title} />
              </div>
              <Input label="Asking Price ($)" value={form.price} onChange={set("price")} type="number" icon={faTag} placeholder="850000" error={errors.price} />
              <Select
                label="Property Status"
                value={form.status}
                onChange={set("status")}
                icon={faCheckDouble}
                placeholder="Select status..."
                error={errors.status}
                options={[
                  { value: "active", label: "Active (For Sale / For Rent)" },
                  { value: "sold", label: "Sold" },
                  { value: "rented", label: "Rented" },
                ]}
              />
            </FormSection>
            </RevealItem>

            <RevealItem>
            <FormSection title="Property Details" icon={faBed}>
              <Select
                label="Property Type"
                value={form.type}
                onChange={set("type")}
                icon={faBuilding}
                placeholder="Select type..."
                error={errors.type}
                options={[
                  { value: "house", label: "House" },
                  { value: "apartment", label: "Apartment" },
                ]}
              />
              <Input label="Total Area (sqft)" value={form.area} onChange={set("area")} type="number" icon={faRulerCombined} placeholder="2450" error={errors.area} />
              <Input label="Bedrooms" value={form.bedNum} onChange={set("bedNum")} type="number" icon={faBed} placeholder="4" error={errors.bedNum} />
              <Input label="Bathrooms" value={form.bathNum} onChange={set("bathNum")} type="number" icon={faBath} placeholder="3" error={errors.bathNum} />
              <Input label="Garage Slots" value={form.garage} onChange={set("garage")} type="number" icon={faCar} placeholder="0" error={errors.garage} />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Property Images</label>
                <label className="flex items-center gap-3 w-full bg-[#f0f7f7] border border-dashed border-[#327878]/30 rounded-2xl px-5 py-4 cursor-pointer hover:bg-[#e8f2f2] transition-colors">
                  <FontAwesomeIcon icon={faImages} className="text-[#327878]" />
                  <span className="text-xs font-bold text-[#327878]">
                    {images.length > 0 ? `${images.length} / ${MAX_IMAGES} photos selected` : `Upload High-Res Photos (up to ${MAX_IMAGES})`}
                  </span>
                  <input type="file" name="images" multiple accept="image/png,image/jpeg" onChange={imagesChangeHandler} className="hidden" />
                </label>
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {images.map((file, i) => (
                      <span key={i} className="flex items-center gap-2 bg-[#327878]/10 text-[#327878] text-[11px] font-bold px-3 py-1.5 rounded-full">
                        {file.name}
                        <button type="button" onClick={() => removeImage(i)} className="hover:text-red-500 transition-colors">
                          <FontAwesomeIcon icon={faXmark} size="xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.images && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.images}</p>}
              </div>
            </FormSection>
            </RevealItem>

            <RevealItem>
            <FormSection title="Location Tracking" icon={faMapPin}>
              <Input label="City" value={form.city} onChange={set("city")} icon={faLocationDot} placeholder="Chicago, IL" error={errors.city} />
              <Input label="Street Address" value={form.address} onChange={set("address")} icon={faLocationDot} placeholder="1234 Maple Street" error={errors.address} />
              <Input label="Latitude" value={form.lat} onChange={set("lat")} type="number" step="any" icon={faMapPin} placeholder="41.8781" error={errors.lat} />
              <Input label="Longitude" value={form.lng} onChange={set("lng")} type="number" step="any" icon={faMapPin} placeholder="-87.6298" error={errors.lng} />
            </FormSection>
            </RevealItem>

            <RevealItem>
            <FormSection title="Amenities & Content" icon={faCheckDouble}>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={set("description")}
                  rows="5"
                  placeholder="Describe the unique features of this property..."
                  className={`w-full bg-[#FBFCFC] border ${errors.description ? "border-red-300" : "border-gray-50"} rounded-2xl p-5 text-sm focus:outline-none focus:border-[#327878] transition-all resize-none`}
                />
                {errors.description && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.description}</p>}
              </div>

              <TagInput
                label="Interior Features"
                type="interior"
                inputValue={form.interiorInput}
                onInputChange={set("interiorInput")}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("interior"); } }}
                onAdd={() => addTag("interior")}
                tags={interiorFeatures}
                onRemove={(i) => removeTag("interior", i)}
                error={errors.interiorFeatures}
              />
              <TagInput
                label="Exterior Features"
                type="exterior"
                inputValue={form.exteriorInput}
                onInputChange={set("exteriorInput")}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("exterior"); } }}
                onAdd={() => addTag("exterior")}
                tags={exteriorFeatures}
                onRemove={(i) => removeTag("exterior", i)}
                error={errors.exteriorFeatures}
              />
            </FormSection>
            </RevealItem>

            </RevealGroup>

            {errors.general && (
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest text-center">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-6 rounded-4xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#327878] transition-all duration-500 shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group"
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