import { useState } from "react";
import Loading from "../loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = (email, password, confirmPassword) => {
    const errs = {};

    if (!email) {
      errs.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Email is not valid!";
    }

    if (!password) {
      errs.password = "Password is required!";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters!";
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords don't match";
    }

    return errs;
  };

const mapApiErrors = (apiErrors = []) => {
  const errs = {};

  apiErrors.forEach((err) => {
    if (err.path) {
      errs[err.path] = err.msg;
    } else {
      errs.general = err.msg || "Something went wrong";
    }
  }); 
  console.log(errs)

  return errs;
};


  const singupHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const frontendErrors = validate(email, password, confirmPassword);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const result = await fetch("http://localhost:8080/api/create-user", {
        method: "POST",
        body: formData
      });

      const data = await result.json();

      if (!result.ok) {
        setErrors(mapApiErrors(data.errors));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
      onSubmit={singupHandler}
    >
      <div className="flex w-full items-center justify-center flex-row gap-5">
         <input
        className="p-2 w-1/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="Name"
        name="name"
      />
       <input
        className="p-2 w-1/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="Surname"
        name="surname"
      />
      </div>
      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="email"
        placeholder="Email"
        name="email"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="password"
        placeholder="Password"
        name="password"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
      />

      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword}</p>
      )}

      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="file"
        placeholder="Avatar"
        name="avatar"
      />
      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="Position"
        name="position"
      /><input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="Description"
        name="description"
      /><input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="number"
        placeholder="Phone"
        name="phone"
      />
      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="Location"
        name="location"
      />
      <div className="flex w-10/12 p-2  flex-col items-center justify-center gap-5">
        <h3>Links</h3>
        <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="linkedin"
        name="linkedin"
      /><input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="facebook"
        name="facebook"
      /><input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="instagram"
        name="instagram"
      />
      </div>

      <input
        className="p-2 w-2/3 rounded-md border border-gray-500 "
        type="text"
        placeholder="Languages"
        name="languages"
      />

      <button
        type="submit"
        className="cursor-pointer font-light w-54 p-2 text-sm rounded-md bg-[#1E1E1E] text-white"
      >
        Create Account
      </button>
      {isLoading && <Loading />}
    </form>
  );
}
