// import { useState } from "react";
import { useEffect, useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
      const [isLoading, setIsLoading] = useState(false);
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
      const token = localStorage.getItem('token');  

      useEffect(() => {
        if(!token){
          navigate('/');
        }
      }, [token, navigate]);


      const validation = (title, price, description) => {
        const errs = {};

        if(title.length < 5){
          errs.title = "The name must be longer than 5 letters!";
        }

         if(price === 0){
          errs.price = "Value must be greater than 0!";
        }

        if(description.length < 25){
          errs.description = "The description must be longer than 25 letters!";
        }

        return errs;
      }

      const mapApiErrors = (apiErrors = []) => {
        const errs = {};

        apiErrors.forEach(err => {
          if(err.field){
            errs[err.field] = err.msg;
          }else{
            errs.general = err.msg;
          }
        })
        return errs;
      }

    const addPropertyHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');

        const frontendErrors = validation(title, price, description);
        if(Object.keys(frontendErrors).length > 0){
          setErrors(frontendErrors);
          return;
        }

        setErrors({});

        try{
          setIsLoading(true);
          const result = await fetch('http://localhost:8080/api/property', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({title: title, price: +price, description: description})
          });

          
          const data = await result.json();
          console.log(data)
          if(!result.ok){ 
            setErrors(mapApiErrors(data.errors));
            setIsLoading(false);
            return;
          }
        
          setIsLoading(false);
            alert('Property added!')
        }catch(err){
          console.log(err);
        }
    }

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
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="text"
              placeholder="Description"
              name="description"
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
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