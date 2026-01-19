import { NavLink } from "react-router-dom"

export default function HeaderLinks ( {path, text} ) {

    return (
          <li className="cursor-pointer relative list-item isolate">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#2c7a7b] py-[18px] px-[15px] text-[15px] font-semibold flex items-center justify-between whitespace-nowrap text-nowrap transition-all"
                    : "text-[#323b3b] py-[18px] px-[15px] text-[15px] font-semibold flex items-center justify-between whitespace-nowrap text-nowrap transition-all hover:text-[#2c7a7b]"
                }
              >
                {text}
              </NavLink>
            </li>
    )
}