import { useNavigate, useParams } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";

export default function EditProperty() {
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [isLoadingPropertyData, setIsLoadingPropertyData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // auth guard
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // frontend validation
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

  // map backend errors
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

  // fetch existing property
  useEffect(() => {
    const fetchInputValues = async () => {
      try {
        setIsLoadingPropertyData(true);

        const result = await fetch(
          `http://localhost:8080/api/property/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!result.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await result.json();

        setInputValues({
          title: data.property.title,
          price: data.property.price,
          description: data.property.description,
        });

        setIsLoadingPropertyData(false);
      } catch (err) {
        console.log(err);
        setIsLoadingPropertyData(false);
      }
    };

    fetchInputValues();
  }, [id, token]);

  // submit
  const saveChangesHandler = async (e) => {
    e.preventDefault();

    const { title, price, description } = inputValues;

    const frontendErrors = validate(title, price, description);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = await fetch(
        `http://localhost:8080/api/edit-property/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            price: Number(price),
            description,
          }),
        }
      );

      const data = await result.json();

      if (!result.ok) {
        setErrors(mapApiErrors(data.errors));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      alert("Property saved!");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-24">
      <ContentWrapper>
        <div className="flex flex-col items-center gap-12">
          <h1 className="text-4xl font-bold">Edit Property</h1>

          {isLoadingPropertyData ? (
            <Loading loadingText="Loading property data" />
          ) : (
            <form
              className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
              onSubmit={saveChangesHandler}
            >
              <input
                className="p-2 w-2/3 rounded-md border border-gray-500"
                type="text"
                name="title"
                placeholder="Title"
                value={inputValues.title}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    title: e.target.value,
                  })
                }
              />
              {errors.title && (
                <p className="text-red-500">{errors.title}</p>
              )}

              <input
                className="p-2 w-2/3 rounded-md border border-gray-500"
                type="number"
                name="price"
                placeholder="Price"
                value={inputValues.price}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    price: e.target.value,
                  })
                }
              />
              {errors.price && (
                <p className="text-red-500">{errors.price}</p>
              )}

              <input
                className="p-2 w-2/3 rounded-md border border-gray-500"
                type="text"
                name="description"
                placeholder="Description"
                value={inputValues.description}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    description: e.target.value,
                  })
                }
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}

              {errors.general && (
                <p className="text-red-500">{errors.general}</p>
              )}

              <button
                type="submit"
                className="cursor-pointer font-light w-34 p-2 text-sm rounded-md bg-[#1E1E1E] text-white"
              >
                {isLoading ? "Saving..." : "Save changes"}
              </button>

              {isLoading && <Loading />}
            </form>
          )}
        </div>
      </ContentWrapper>
    </section>
  );
}
