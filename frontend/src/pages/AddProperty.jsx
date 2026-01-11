// import { useState } from "react";
import { useEffect, useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const validate = (title, price, description) => {
    const errs = {};

    if (!title || title.length < 5) {
      errs.title = "The name must be longer than 5 letters!";
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      errs.price = "Value must be greater than 0!";
    }

    if (!description || description.length < 25) {
      errs.description = "The description must be longer than 25 letters!";
    }

    return errs;
  };

  const mapApiErrors = (apiErrors = []) => {
    const errs = {};

    apiErrors.forEach((err) => {
      if (err.field) {
        errs[err.field] = err.msg;
      } else {
        errs.general = err.msg;
      }
    });
    return errs;
  };

  const addPropertyHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const price = formData.get("price");
    // const city = formData.get("city");
    // const address = formData.get("address");
    // const lat = formData.get("lat");
    // const lng = formData.get("lng");
    const description = formData.get("description");
    // const images = formData.get("images");
    // const type = formData.get("type");
    // const bedNum = formData.get("bedNum");
    // const bathNum = formData.get("bathNum");
    // const area = formData.get("area");
    // const garage = formData.get("garage");
    // const status = formData.get("status");
    // const interiorFeatures = formData.get("interiorFeatures");
    // const exteriorFeatures = formData.get("exteriorFeatures");

    // const property = {
    //    title: title,
    //    price: +price,
    //    location: {
    //     city: city,
    //     address: address,
    //     lat: lat, 
    //     lng: lng
    //    },
    //    escription: description,
    //    images: images,
    //    type: type,
    //    bedNum: bedNum,
    //    bathNum: bathNum,
    //    area: area,
    //    garage: garage,
    //    status: status,
    //    interiorFeatures: interiorFeatures,
    //    exteriorFeatures: exteriorFeatures
    // }

    const frontendErrors = validate(title, price, description);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});

    try {
      setIsLoading(true);
      const result = await fetch("http://localhost:8080/api/property", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await result.json();
      console.log(data);
      if (!result.ok) {
        setErrors(mapApiErrors(data.errors));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      alert("Property added!");
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="pt-24">
      <ContentWrapper>
        <div className="flex flex-col items-center gap-12">
          <h1 className="text-4xl font-bold">Add New Listings</h1>
          <form
            className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
            action=""
            onSubmit={addPropertyHandler}
          >
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="text"
              placeholder="Title"
              name="title"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="number"
              placeholder="Price"
              name="price"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
            <div className="border flex flex-col w-6/9 gap-2 p-2 items-center justify-center">
              <h4>Location</h4>
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="City" type="text"  name="city" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Address" type="text" name="address" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Latitude" type="number" name="lat" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Longitude" type="number" name="lng" id="" />
            </div>

            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="text"
              placeholder="Description"
              name="description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " type="file" multiple  name="images" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Type" type="text"  name="type" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Bed Number" type="number"  name="bedNum" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Bath Number" type="number"  name="bathNum" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Area" type="number"  name="area" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Garage" type="number"  name="garage" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="Status" type="text"  name="status" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="interiorFeatures" type="text"  name="interiorFeatures" id="" />
              <input className="p-2 w-2/3 rounded-md border border-gray-500 " placeholder="exteriorFeatures" type="text"  name="exteriorFeatures" id="" />

            {errors.general && <p className="text-red-500">{errors.general}</p>}
            <button className="cursor-pointer font-light w-24 p-2 text-sm rounded-md bg-[#1E1E1E] text-white">
              {isLoading ? "Adding..." : " Add New"}
            </button>
          </form>
        </div>
      </ContentWrapper>
    </section>
  );
}
