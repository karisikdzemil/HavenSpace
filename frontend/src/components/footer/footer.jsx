import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import FooterContact from "./components/FooterContact";
import FooterLinks from "./components/FooterLinks";

export default function Footer() {
  const footerPageLinks = [
    { text: "About", link: "/" },
    { text: "Careers", link: "/" },
    { text: "Press", link: "/" },
    { text: "Blog", link: "/" },
    { text: "Contact", link: "/" },
  ];

  const footerLinks = [
    { text: "Digital Strategy", link: "/" },
    { text: "Cloud Computing", link: "/" },
    { text: "Data Analytics", link: "/" },
    { text: "AI Solutions", link: "/" },
    { text: "Cybersecurity", link: "/" },
  ];

  return (
    <footer className="text-[#323b3b] bg-white text-[14px] border-t border-[#2c7a7b]/25">
      <div className="max-w-[1440px] flex flex-col justify-between m-auto pt-4 lg:pt-20">
        <div className="flex gap-8 lg:flex-row px-10 pb-10 flex-col">
          <FooterContact />

          <div className="flex lg:w-1/3 w-full items-center justify-evenly">
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
              <p className="text-[#323b3b]/75 flex items-center text-[14px] hover:ml-3 transition-all">
                2847 Maple Avenue <br /> Los Angeles, CA 90210 <br /> United
                States
              </p>
            </div>
            <div className=" flex items-center justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faPhone} />
              </div>
              <p className="text-[#323b3b]/75 flex items-center text-[14px] hover:ml-3 transition-all">
                +1 (555) 987-6543
              </p>
            </div>
            <div className=" flex items-center justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faEnvelope} />
              </div>
              <p className="text-[#323b3b]/75 flex items-center text-[14px] hover:ml-3 transition-all">
                contact@example.com
              </p>
            </div>

            <div className="flex gap-4 mt-3">
              <a
                href="/"
                className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>

              <a
                href="/"
                className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href="/"
                className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>

              <a
                href="/"
                className="w-10 h-10 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:bg-[#2c7a7b] flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-26 flex justify-between bg-[#2c7a7b] px-10 py-5">
          <p className="text-white/70 font-light ">
            <FontAwesomeIcon icon={faCopyright} /> Copyright{" "}
            <span className="font-bold">HavenSpace</span> All Rights Reserved
          </p>
          <div className="flex flex-col justify-between">
            <div className="flex gap-3">
              <span className="text-white/70 font-light ">Privacy Policy</span>
              <span className="text-white/70 font-light ">
                Terms of Service
              </span>
              <span className="text-white/70 font-light ">Cokiee Policy</span>
            </div>
            <p className="text-white/70 font-light text-right">
              Design by{" "}
              <span className="font-bold text-white">Dzemil Karisik</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
