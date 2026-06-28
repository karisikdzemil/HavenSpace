import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { avatarUrl } from "../../config/api";
import HeaderLinks from "./components/HeaderLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronDown, faUserPen, faHeart, faBuildingUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Skrola na dolje
      } else {
        setIsVisible(true);  // Skrola na gore
      }

      setLastScrollY(currentScrollY);

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full py-5 z-50 md:px-10 px-4 fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full bg-white rounded-[50px] shadow-xl py-2.5 px-[25px] flex items-center justify-between relative z-50">
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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-50 transition-all"
              >
                <img
                  src={avatarUrl(user?.avatar)}
                  alt={user?.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#f0f5f5]"
                />
                <span className="text-[14px] font-semibold text-[#163535]">{user?.name}</span>
                <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] text-gray-400 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-56 bg-white rounded-3xl shadow-2xl border border-gray-50 p-2 animate-fadeIn">
                  <Link onClick={() => setIsMenuOpen(false)} to="/edit-profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#323b3b] text-sm font-semibold hover:bg-gray-50 hover:text-[#2c7a7b] transition-all">
                    <FontAwesomeIcon icon={faUserPen} className="w-4 text-[#2c7a7b]" /> Edit Profile
                  </Link>
                  <Link onClick={() => setIsMenuOpen(false)} to="/my-properties" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#323b3b] text-sm font-semibold hover:bg-gray-50 hover:text-[#2c7a7b] transition-all">
                    <FontAwesomeIcon icon={faBuildingUser} className="w-4 text-[#2c7a7b]" /> My Properties
                  </Link>
                  <Link onClick={() => setIsMenuOpen(false)} to="/my-properties#saved" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#323b3b] text-sm font-semibold hover:bg-gray-50 hover:text-[#2c7a7b] transition-all">
                    <FontAwesomeIcon icon={faHeart} className="w-4 text-[#2c7a7b]" /> Saved Properties
                  </Link>
                  <div className="h-px bg-gray-100 my-1.5" />
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 text-sm font-semibold hover:bg-red-50 transition-all"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
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

        <button onClick={toggleMenu} className="block xl:hidden cursor-pointer focus:outline-none">
          <FontAwesomeIcon
            className="text-xl transition-all hover:text-[#3d9ea0] text-[#163535]"
            icon={isOpen ? faXmark : faBars}
          />
        </button>
      </div>

      <div
        className={`xl:hidden absolute left-4 right-4 bg-white mt-3 rounded-4xl shadow-2xl p-6 transition-all duration-300 ease-in-out border border-gray-50 z-40 ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
      >
        <nav className="mb-6">
          <ul className="flex flex-col gap-2">
            <div onClick={closeMenu}><HeaderLinks path="/" text="Home" /></div>
            <div onClick={closeMenu}><HeaderLinks path="/properties" text="Properties" /></div>
            <div onClick={closeMenu}><HeaderLinks path="/agents" text="Agents" /></div>

            {isAuthenticated && (
              <>
                <div onClick={closeMenu}><HeaderLinks path="/new-listings" text="New Listings" /></div>
                <div onClick={closeMenu}><HeaderLinks path="/my-properties" text="My Properties" /></div>
                <div onClick={closeMenu}><HeaderLinks path="/edit-profile" text="Edit Profile" /></div>
              </>
            )}
            <div onClick={closeMenu}><HeaderLinks path="/contact" text="Contact" /></div>
          </ul>
        </nav>

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
