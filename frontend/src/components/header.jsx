import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-transparent w-full p-5 transition-all flex">

      <div className="w-full rounded-[50px] shadow-xl py-[5px] px-[25px] flex items-center justify-center gap-5">

      {/* <img className="h-[9vh]" src="/HavenSpaceLogo.png" alt="Logo" /> */}
      <h1 className="text-[22px] font-bold text-[#163535]">HavenSpace</h1>
      <nav className="w-full">
        <ul className="flex justify-between">
          <div className="flex gap-12 items-center">
            <li className="cursor-pointer">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "px-[15px] py-[18px] transition-all border-b-2 border-black"
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
                    to={"/agents"}
                    className={({ isActive }) =>
                      isActive
                        ? "pb-0.5 transition-all border-b-2 border-black"
                        : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                    }
                  >
                    AGENTS
                  </NavLink>
                </li>
            {isAuthenticated && (
              <>
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
                    to={"/my-properties"}
                    className={({ isActive }) =>
                      isActive
                        ? "pb-0.5 transition-all border-b-2 border-black"
                        : "hover:pb-0 hover:transition-all hover:border-b-2 border-black"
                    }
                  >
                    MY PROPERTIES
                  </NavLink>
                </li>
              </>
            )}
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
            {isAuthenticated ? (
              <li className="cursor-pointer">
                <button
                  onClick={() => logout()}
                  className="hover:pb-0 hover:transition-all cursor-pointer hover:border-b-2 border-black"
                >
                  LOGOUT
                </button>
              </li>
            ) : (
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
            )}
          </div>
        </ul>
      </nav>
      </div>
    </header>
  );
}
