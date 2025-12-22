import { useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import Login from "../components/register/Login";
import Signup from "../components/register/SignUp";

export default function Register() {
  const [registerType, setRegisterType] = useState("login");

  const changeTypeHandler = () => {
    setRegisterType(prevType => prevType === 'login' ? 'signup' : 'login')
  }

  return (
    <section>
      <ContentWrapper>
        <div className="flex items-center justify-center pt-42 flex-col gap-5">
          {registerType === "login" ? <Login /> : <Signup />}

          <div className="flex items-center justify-center gap-5">
            <p>
              {registerType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              onClick={changeTypeHandler}
              className="cursor-pointer font-light w-24 p-2 text-sm rounded-md bg-[#1E1E1E] text-white"
            >
              {registerType === "login" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
