import { useState } from "react";
import Loading from "../loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { login } = useAuth();

  const validate = (email, password) => {
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

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const frontendErrors = validate(email, password);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await result.json();

      if (!result.ok) {
        setErrors(mapApiErrors(data.errors));
        setIsLoading(false);
        return;
      }
      console.log(data)
      login(data.user, data.token);
      // localStorage.setItem("token", data.token);
      setIsLoading(false);
      navigate('/')
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
      onSubmit={loginHandler}
    >
      <div className="w-2/3">
        <input
          className="p-2 w-full rounded-md border border-gray-500"
          type="email"
          placeholder="Email"
          name="email"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="w-2/3">
        <input
          className="p-2 w-full rounded-md border border-gray-500"
          type="password"
          placeholder="Password"
          name="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password}</p>
        )}
      </div>

      {errors.general && (
        <p className="text-red-500">{errors.general}</p>
      )}

      <button
        type="submit"
        className="cursor-pointer font-light w-24 p-2 text-sm rounded-md bg-[#1E1E1E] text-white"
      >
        Login
      </button>

      {isLoading && <Loading />}
    </form>
  );
}
