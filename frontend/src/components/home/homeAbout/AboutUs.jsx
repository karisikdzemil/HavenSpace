import ContentWrapper from "../../contentWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import Numbers from "./components/Numbers";


export default function AboutUs() {
  return (
    <section>
      <ContentWrapper>
        <span className="text-white font-bold rounded-[50px] w-50 text-sm px-4 py-3 bg-[#2c7a7b]">
          <FontAwesomeIcon
            icon={faBuilding}
            className="text-sm"
            color="white"
          />
          Premium Properties
        </span>
        <main>
            <div>
                <h2 className="text-[#163535] md:text-[2.2rem] text-[1.5rem] font-bold md:leading-18 leading-14">Transforming Real Estate Dreams Into Reality</h2>
                <p className="text-[#323b3b]/80 text-[1.1rem] leading-relaxed">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore dolore magna aliqua. Enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.</p>
                <div>
                    <Numbers />
                    <div>95</div>
                    <div>24/7</div>
                </div>
                
            </div>
            <div></div>
        </main>
      </ContentWrapper>
    </section>
  );
}
