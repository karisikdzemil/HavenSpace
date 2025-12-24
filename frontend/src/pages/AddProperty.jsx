// import { useState } from "react";
import ContentWrapper from "../components/contentWrapper";

export default function AddProperty() {
    // const [newPropertyData, setNewPropertyData] = useState({});
    

    const addPropertyHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');

        const token = localStorage.getItem('token');

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

        // setNewPropertyData({title: title, price: price, description: description});
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
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="number"
              placeholder="Price"
              name="price"
            />
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="text"
              placeholder="Description"
              name="description"
            />
            <button className="cursor-pointer font-light w-24 p-2 text-sm rounded-md bg-[#1E1E1E] text-white">
              Add New
            </button>
          </form>
        </div>
      </ContentWrapper>
    </section>
  );
}