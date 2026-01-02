import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faLocationDot, faBath, faBed } from "@fortawesome/free-solid-svg-icons";
import SpecWrapper from "./components/SpecWrapper";



export default function PropertyCard( {propertie} ) {
  console.log(`url(http://localhost:8080/${propertie.images[0]})`)
  return (
    <li className="w-[30%] min-h-112 rounded-md shadow-gray-400 shadow-xs cursor-pointer transition-all hover:scale-x-102">
     <a href={`/propertie/${propertie._id}`}>
       <div style={{
    backgroundImage: `url(http://localhost:8080/${propertie.images[0]})`,
  }} className='w-full h-64 rounded-md bg-cover bg-center'></div>
        <div className="flex items-center justify-between px-5 py-5">
            <div className="flex flex-col gap-2 items-start justify-left">
                <h3 className="text-2xl">{propertie.title}</h3>
                <p className="text-sm text-gray-700 font-light"><FontAwesomeIcon icon={faLocationDot} />{`${propertie.location.city}, ${propertie.location.address}`}</p>
            </div>
            <h3 className="text-2xl" >${propertie.price}</h3>
        </div>
        <div className="flex items-center justify-between px-5 py-2 text-gray-700 font-light">
            <SpecWrapper icon={<FontAwesomeIcon icon={faBath} />} text={`${propertie.bathNum} Bathroom`}/>
            <div className="h-4 w-px bg-gray-700"></div>
            <SpecWrapper icon={<FontAwesomeIcon icon={faBed} />} text={`${propertie.bedNum} Bedroom`}/>

            <div className="h-4 w-px bg-gray-700"></div>
            <SpecWrapper icon={<FontAwesomeIcon icon={faSquare} />} text={`${propertie.area} m2`}/>
        </div>
     </a>
    </li>
  );
}
