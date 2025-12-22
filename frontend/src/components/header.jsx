import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-[10vh] flex gap-22 px-12 bg-white absolute items-center">
      <img className="h-[9vh]" src="/HavenSpaceLogo.png" alt="Logo" />
      <nav className="w-full">
        <ul className="flex justify-between">
          <div className="flex gap-12 h-[10vh] items-center">
            <li className="cursor-pointer">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "pb-0.5 transition-all border-b-2 border-black"
                    : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                }
              >
                HOME
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                to={"/properties"}
                className={({ isActive }) =>
                  isActive
                    ? "pb-0.5 transition-all border-b-2 border-black"
                    : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                }
              >
                PROPERTIES
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                to={"/new-listings"}
                className={({ isActive }) =>
                  isActive
                    ? "pb-0.5 transition-all border-b-2 border-black"
                    : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                }
              >
                NEW LISTINGS
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  isActive
                    ? "pb-0.5 transition-all border-b-2 border-black"
                    : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                }
              >
                CONTACT
              </NavLink>
            </li>
          </div>

          <div className="flex gap-12 items-center">
            <li className="cursor-pointer">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "pb-0.5 transition-all border-b-2 border-black"
                    : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                }
              >
                REGISTER
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
