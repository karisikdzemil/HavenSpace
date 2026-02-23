import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FooterIconWrapper( {iconObjs} ) {
    return (
    <div className="flex gap-4 mt-3">
    {iconObjs.map((iconObj) => (
    <a 
      href={`${iconObj.link}`}
      className="w-10 h-10 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:bg-[#2c7a7b] flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40"
    >
      <FontAwesomeIcon icon={iconObj.icon} />
    </a>
    ))}
    </div>
  );
}
