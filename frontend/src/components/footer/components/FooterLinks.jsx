import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function FooterLinks({title, links}) {
  return (
    <div className="flex min-w-46 flex-col gap-6">
      <h3 className="text-[#163535]/75 text-2xl font-semibold">{title}</h3>
      <ul className="flex flex-col">
        {links.map((el) => (
        <li>
          <a
            className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] duration-300 hover:ml-3 transition-all"
            href={`${el.link}`}
          >
            <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
            {el.text}
          </a>
        </li>
        ))}
      </ul>
    </div>
  );
}
