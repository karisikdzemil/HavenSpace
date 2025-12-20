import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faLocationDot, faBath, faBed } from "@fortawesome/free-solid-svg-icons";
import SpecWrapper from "./components/SpecWrapper";



export default function PropertyCard( {propertie} ) {
  return (
    <li className="w-1/3 h-112 rounded-md shadow-gray-400 shadow-xs cursor-pointer transition-all hover:scale-x-102">
     <a href={`/propertie/${propertie._id}`}>
       <div className="w-full h-3/5 bg-[url(/heroBackground.png)] rounded-md bg-cover bg-center"></div>
        <div className="flex items-center justify-between px-5 py-5">
            <div className="flex flex-col gap-2 items-start justify-left">
                <h3 className="text-2xl">{propertie.title}</h3>
                <p className="text-sm text-gray-700 font-light"><FontAwesomeIcon icon={faLocationDot} />100 High St, London, W1D N1R</p>
            </div>
            <h3 className="text-2xl" >${propertie.price}</h3>
        </div>
        <div className="flex items-center justify-between px-5 py-2 text-gray-700 font-light">
            <SpecWrapper icon={<FontAwesomeIcon icon={faBath} />} text={'2 Bathroom'}/>
            <div className="h-4 w-px bg-gray-700"></div>
            <SpecWrapper icon={<FontAwesomeIcon icon={faBed} />} text={'3 Bedroom'}/>

            <div className="h-4 w-px bg-gray-700"></div>
            <SpecWrapper icon={<FontAwesomeIcon icon={faSquare} />} text={'1,300 sq ft'}/>
        </div>
     </a>
    </li>
  );
}
