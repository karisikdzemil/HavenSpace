import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../contentWrapper";

export default function HomeHeroSection() {
  return (
    <section className="bg-gray-50">
      <ContentWrapper>
        <div>
          <div>
            <span className="text-white font-bold px-4 py-2 bg-[#2c7a7b]"><FontAwesomeIcon icon={faStar} color="white" /> Premium Properties</span>
          </div>
          <div></div>
        </div>
      </ContentWrapper>
      ,
    </section>
  );
}
