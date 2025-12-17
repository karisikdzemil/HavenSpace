import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";



export default function PropertyCard() {
  return (
    <li className="w-1/3 h-126 rounded-md bg-amber-200">
      <div className="w-full h-3/5 bg-[url(/heroBackground.png)] rounded-md bg-cover bg-center"></div>
        <div>
            <div>
                <h3>Asri Permata</h3>
                <p>100 High St, London, W1D N1R</p>
            </div>
            <h3>1200$</h3>
        </div>
        <div>
            <div><p>2 Bathroom</p></div>
            <div><p>3 Bedroom</p></div>
            <div><FontAwesomeIcon icon={faHouse} /><p>1,300 sq ft</p></div>
        </div>
    </li>
  );
}
