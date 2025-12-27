
import { useParams } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { useEffect, useState } from "react";

export default function EditProperty() {
    const [inputValues, setInputValues] = useState({})
    const params = useParams();
    const id = params.id;

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchInputValues = async () => {
            try{
                const result = await fetch(`http://localhost:8080/api/property/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                if(!result.ok){
                    console.log('Something went wrong!');
                    return;
                }
                const data = await result.json();
                console.log(data)
                setInputValues({title: data.property.title, price: data.property.price, description: data.property.description});
            }catch(err){
                console.log(err)
            }
        }
        fetchInputValues();
    }, [id, token]);

    const saveChangesHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');

        const token = localStorage.getItem('token');

        try{
            const result = await fetch(`http://localhost:8080/api/edit-property/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: title, price: price, description: description}),
            });

            if(!result.ok){
                console.log('Something went wrong!');
                return;
            }

            const data = await result.json();

            console.log(data);

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
            onSubmit={saveChangesHandler}
          >
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="text"
              placeholder="Title"
              name="title"
              defaultValue={inputValues && inputValues.title}
            />
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="number"
              placeholder="Price"
              name="price"
              defaultValue={inputValues && inputValues.price}
            />
            <input
              className="p-2 w-2/3 rounded-md border border-gray-500 "
              type="text"
              placeholder="Description"
              name="description"
              defaultValue={inputValues && inputValues.description}
            />
            <button type="submit" className="cursor-pointer font-light w-34 p-2 text-sm rounded-md bg-[#1E1E1E] text-white">
                Save Changes
            </button>
          </form>
        </div>
      </ContentWrapper>
    </section>
  );
}