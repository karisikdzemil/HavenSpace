import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HeaderLinks from "./components/HeaderLinks";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-yellow-200 w-full py-5 transition-all flex items-center">
      <div className="w-full bg-white rounded-[50px] shadow-xl py-[5px] px-[25px] flex items-center justify-center gap-5">
        <h1 className="text-[22px] font-bold text-[#163535]">HavenSpace</h1>
        <nav className="w-full p-0">
          <ul className="flex items-center justify-center gap-24 m-0 p-0">
            <div className="flex items-center justify-center m-0 p-0">
              <HeaderLinks path={"/"} text={"Home"} />
              <HeaderLinks path={"/properties"} text={"Properties"} />
              <HeaderLinks path={"/agents"} text={"Agents"} />

              {isAuthenticated && (
                <>
                  <HeaderLinks path={"/new-listings"} text={"New Listings"} />{" "}
                  <HeaderLinks path={"/my-properties"} text={"My Properties"} />
                </>
              )}
              <HeaderLinks path={"/contact"} text={"Contact"} />
            </div>
            {isAuthenticated ? (
              <li className="cursor-pointer">
                <button
                  onClick={() => logout()}
                  className="text-white bg-[#2c7a7b] text-[14px] py-2 px-5 ml-[30px] rounded-[50px] transition-all hover:bg-[#3d9ea0]"
                >
                  LOGOUT
                </button>
              </li>
            ) : (
               <li className="cursor-pointer relative list-item isolate">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-[#3d9ea0] text-[14px] py-2 px-5 ml-[30px] rounded-[50px] transition-all"
                    : "text-white bg-[#2c7a7b] text-[14px] py-2 px-5 ml-[30px] rounded-[50px] transition-all hover:bg-[#3d9ea0]"
                }
              >
                Register
              </NavLink>
            </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
