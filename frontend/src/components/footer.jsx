import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faLocationDot,
  faPhone,
  faEnvelope,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="text-[#323b3b] bg-white text-[14px] border-t border-[#2c7a7b]/25">
      <div className="max-w-[1440px] m-auto lg:px-10 px-2 lg:py-20 py-4">
        <div className="flex gap-8 lg:flex-row flex-col">
          <div className="lg:w-1/3 bg-amber-100 w-full flex flex-col lg:items-start gap-5 ">
            <h3 className="text-3xl font-bold text-[#16353]">HavenSpace</h3>
            <p className="text-[15px] text-[#323b3b] leading-relaxed">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae. Donec velit neque auctor sit amet aliquam
              vel ullamcorper sit amet ligula.
            </p>
            <label
              className="text-[1rem] font-bold text-[#163535]"
              htmlFor="contact"
            >
              Stay Updated
            </label>
            <form className="w-full flex lg:justify-start" action="" method="">
              <input
                className="lg:w-8/12 w-full bg-white pl-4 py-2 rounded-l-[100px] shadow-2xl "
                placeholder="Enter your email"
                type="email"
                name="contact"
                id=""
              />
              <button className="w-2/12 bg-[#2c7a7b] text-xl py-2 transition-all cursor-pointer text-center hover:bg-[#3d9ea0] rounded-r-[100px] text-white">
                {">"}
              </button>
            </form>
          </div>

          <div className="flex lg:w-1/3 w-full items-center justify-evenly">
            <div className="flex flex-col gap-6 bg-amber-300">
              <h3 className="text-[#163535]/75 text-2xl font-semibold">
                Company
              </h3>
              <ul className="flex flex-col">
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Press
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6 bg-amber-300">
              <h3 className="text-[#163535]/75 text-2xl font-semibold">
                Solutions
              </h3>
              <ul className="flex flex-col">
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Digital Strategy
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Cloud Computing
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Data Analytics
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    AI Solutions
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#323b3b]/75 py-2 decoration-0 flex items-center text-[14px] hover:ml-3 transition-all"
                    href="/"
                  >
                    <FontAwesomeIcon icon={faChevronRight} color="#2c7a7b" />
                    Cybersecurity
                  </a>
                </li>
              </ul>
            </div>
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
                <p className="text-[#323b3b]/75 flex items-center text-[14px] hover:ml-3 transition-all">2847 Maple Avenue <br/> Los Angeles, CA 90210  <br/> United States</p>
            </div>
             <div className=" flex items-center justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faPhone} />
              </div>
                <p className="text-[#323b3b]/75 flex items-center text-[14px] hover:ml-3 transition-all">+1 (555) 987-6543</p>
            </div>
             <div className=" flex items-center justify-start gap-5">
              {" "}
              <div className="w-10 h-10 flex items-center justify-center rounded-[50%] text-[18px] bg-[#2c7a7b]/50">
                <FontAwesomeIcon color="#2c7a7b" icon={faEnvelope} />
              </div>
                <p className="text-[#323b3b]/75 flex items-center text-[14px] hover:ml-3 transition-all">contact@example.com</p>
            </div>
            <div>
               <a href="/" className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
              <div>
               <a href="/" className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
              <div>
               <a href="/" className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
              <div>
               <a href="/" className="w-10 h-10 flex items-center text-[#323b3b]/80 justify-center rounded-[50%] text-[18px] bg-[#323b3b]/40">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </footer>
  );
}
