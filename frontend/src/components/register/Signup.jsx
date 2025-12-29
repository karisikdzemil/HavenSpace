import { useState } from "react";
import Loading from "../loading/Loading";

export default function Signup() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      if (err.field) {
        errs[err.field] = err.msg;
      } else {
        errs.general = err.message;
      }
    });

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        setErrors(mapApiErrors(data.errors));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="w-3/5 h-auto py-22 rounded-md border-2 border-gray-500 flex flex-col items-center justify-center gap-5"
      onSubmit={singupHandler}
    >
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
