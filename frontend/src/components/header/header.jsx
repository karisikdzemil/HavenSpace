import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HeaderLinks from "./components/HeaderLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  // State koji prati da li je mobilni meni otvoren
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="w-full py-5 z-50 md:px-10 px-4 bg-transparent absolute">
      <div className="w-full bg-white rounded-[50px] shadow-xl py-2.5 px-[25px] flex items-center justify-between relative z-50">
        <h1 className="text-[22px] font-bold text-[#163535]">HavenSpace</h1>

        {/* DESKTOP NAV */}
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

        {/* DESKTOP AUTH BUTTON */}
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

        {/* HAMBURGER / ZATVORI DUGME (Zamenjuje ikonicu dinamički) */}
        <button onClick={toggleMenu} className="block xl:hidden cursor-pointer focus:outline-none">
          <FontAwesomeIcon
            className="text-xl transition-all hover:text-[#3d9ea0] text-[#163535]"
            icon={isOpen ? faXmark : faBars}
          />
        </button>
      </div>

      {/* MOBILNI MENI PADAJUĆI PANEL */}
      <div
        className={`xl:hidden absolute left-4 right-4 bg-white mt-3 rounded-[2rem] shadow-2xl p-6 transition-all duration-300 ease-in-out border border-gray-50 z-40 ${
          isOpen 
            ? "opacity-100 translate-y-0 visible" 
            : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
      >
        <nav className="mb-6">
          <ul className="flex flex-col gap-2">
            {/* Dodat onClick={closeMenu} da se meni sam zatvori kada korisnik klikne na link */}
            <div onClick={closeMenu}><HeaderLinks path="/" text="Home" /></div>
            <div onClick={closeMenu}><HeaderLinks path="/properties" text="Properties" /></div>
            <div onClick={closeMenu}><HeaderLinks path="/agents" text="Agents" /></div>

            {isAuthenticated && (
              <>
                <div onClick={closeMenu}><HeaderLinks path="/new-listings" text="New Listings" /></div>
                <div onClick={closeMenu}><HeaderLinks path="/my-properties" text="My Properties" /></div>
              </>
            )}
            <div onClick={closeMenu}><HeaderLinks path="/contact" text="Contact" /></div>
          </ul>
        </nav>

        {/* MOBILNI AUTH BUTTON */}
        <div className="pt-4 border-t border-gray-100 flex justify-center">
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); closeMenu(); }}
              className="w-full text-center text-white bg-[#2c7a7b] text-[14px] py-3 px-5 rounded-[50px] transition-all hover:bg-[#3d9ea0] font-semibold uppercase tracking-wider"
            >
              LOGOUT
            </button>
          ) : (
            <NavLink
              to="/register"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full text-center text-white text-[14px] py-3 px-5 rounded-[50px] duration-300 transition-all font-semibold tracking-wider ${
                  isActive ? "bg-[#3d9ea0]" : "bg-[#2c7a7b] hover:bg-[#3d9ea0]"
                }`
              }
            >
              Register
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}