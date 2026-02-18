import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HeaderLinks from "./components/HeaderLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full py-5 md:px-10 px-4 bg-transparent absolute">
      <div className="w-full bg-white rounded-[50px] shadow-xl py-2.5  px-[25px] flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-[#163535]">HavenSpace</h1>

        <nav className="hidden xl:block">
          <ul className="flex items-center gap-10">
            <HeaderLinks path="/" text="Home" />
            <HeaderLinks path="/properties" text="Properties" />
            <HeaderLinks path="/agents" text="Agents" />

            {isAuthenticated && (
              <>
                <HeaderLinks path="/new-listings" text="New Listings" />
                <HeaderLinks path="/my-properties" text="My Properties" />
              </>
            )}
            <HeaderLinks path="/contact" text="Contact" />
          </ul>
        </nav>

        <div className="hidden items-center xl:flex">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-white bg-[#2c7a7b] text-[14px] py-2 px-5 rounded-[50px] transition-all hover:bg-[#3d9ea0]"
            >
              LOGOUT
            </button>
          ) : (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-white text-[14px] py-2 px-5 rounded-[50px] duration-300 transition-all ${
                  isActive ? "bg-[#3d9ea0]" : "bg-[#2c7a7b] hover:bg-[#3d9ea0]"
                }`
              }
            >
              Register
            </NavLink>
          )}
        </div>
        <button className="block xl:hidden cursor-pointer">
          <FontAwesomeIcon
            className="text-xl transition-all hover:text-[#3d9ea0]"
            icon={faBars}
          />
        </button>
      </div>
    </header>
  );
}
