import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function FooterBottom() {
  return (
    <div className="w-full min-h-26 flex flex-col md:flex-row gap-2 items-center justify-between bg-[#2c7a7b] px-10 md:px-30 lg:px-10 py-5">
      <p className="text-white/70 font-light ">
        <FontAwesomeIcon icon={faCopyright} /> Copyright{" "}
        <span className="font-bold">HavenSpace</span> All Rights Reserved
      </p>
      <div className="flex flex-col h-16 justify-between">
        <div className="flex gap-3">
          <span className="text-white/70 font-light ">Privacy Policy</span>
          <span className="text-white/70 font-light ">Terms of Service</span>
          <span className="text-white/70 font-light ">Cokiee Policy</span>
        </div>
        <p className="text-white/70 font-light text-center md:text-right">
          Design by <span className="font-bold text-white">Dzemil Karisik</span>
        </p>
      </div>
    </div>
  );
}
