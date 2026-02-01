import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import FooterContact from "./components/FooterContact";
import FooterIconWrapper from "./components/FooterIconWrapper";
import { footerPageLinks } from "../../data/data";
import { footerLinks } from "../../data/data";
import { footerIconData } from "../../data/data";
import FooterLinks from "./components/FooterLinks";
import FooterBottom from "./components/FooterBottom";

export default function Footer() {
  return (
    <footer className="text-[#323b3b] bg-white text-[14px] border-t border-[#2c7a7b]/25">
      <div className="max-w-[1440px] flex flex-col justify-between m-auto pt-4 lg:pt-20">
        <div className="flex gap-8 lg:flex-row px-10 md:px-30 md:pt-20 pt-0 lg:pt-0 lg:px-10 pb-10 flex-col">
          <FooterContact />

          <div className="flex lg:w-1/3 w-full justify-evenly lg:items-center md:justify-start gap-5 lg:justify-evenly">
            <FooterLinks title={"Company"} links={footerPageLinks} />
            <FooterLinks title={"Solutions"} links={footerLinks} />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[#163535]/75 text-2xl font-semibold">
              Get in Touch
            </h3>
            <div className="flex items-start justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faLocationDot} />
              </div>
              <p className="text-[#323b3b]/75 flex items-center text-[14px] transition-all">
                2847 Maple Avenue <br /> Los Angeles, CA 90210 <br /> United
                States
              </p>
            </div>
            <div className=" flex items-center justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faPhone} />
              </div>
              <p className="text-[#323b3b]/75 flex items-center text-[14px] transition-all">
                +1 (555) 987-6543
              </p>
            </div>
            <div className=" flex items-center justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faEnvelope} />
              </div>
              <p className="text-[#323b3b]/75 flex items-center text-[14px] transition-all">
                contact@example.com
              </p>
            </div>

              <FooterIconWrapper iconObjs={footerIconData}/>
          </div>
        </div>
      <FooterBottom />
      </div>
    </footer>
  );
}
