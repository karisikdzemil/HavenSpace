import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ContentWrapper from "../contentWrapper";
import Heading from "../Heading";

export default function HomeHeroSection() {
  return (
    <section className="bg-gray-100">
      <ContentWrapper>
        <div className="flex flex-row justify-center gap-5 pt-10">
          <div className="w-1/2 flex flex-col">
            <span className="text-white font-bold rounded-[50px] w-50 text-sm px-4 py-3 bg-[#2c7a7b]">
              <FontAwesomeIcon
                icon={faStar}
                className="text-sm"
                color="white"
              />{" "}
              Premium Properties
            </span>
            <Heading text={"Discover Your Perfect Home in the Heart of the City"}/>
            <p className="text-[#323b3b]/80 text-[1.1rem] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Browse thousands of verified listings from trusted agents.</p>
            <form action="" className="bg-white p-4 rounded-md shadow-2xl mt-4 py-4 flex flex-col gap-2">
              <input className="w-full px-2 py-4 rounded-md border border-gray-300 text-[14px] h-14 text-[#323b3b]" placeholder="Location" type="" name="location" id="" />
              <div className="flex gap-2 md:flex-row flex-col">
                <select className="w-full px-2 py-4 rounded-md border border-gray-300 text-[14px] h-14 text-[#323b3b]" name="" id="">
                  <option value="">Select type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                </select>
                <select className="w-full px-2 py-4 rounded-md border border-gray-300 text-[14px] h-14 text-[#323b3b]" name="" id="">
                  <option value="">Price Range</option>
                  <option value="under 200k">Under $200K</option>
                  <option value="200-500">$200K - $500K</option>
                  <option value="500-800">$500K - $800K</option>
                  <option value="800-1200000">$800K - $1000000</option>
                  <option value="above 1200000">Above $1200000</option>
                </select>
              </div>
               <div className="flex md:flex-row flex-col gap-2">
                <select className="w-full px-2 py-4 rounded-md border border-gray-300 text-[14px] h-14 text-[#323b3b]" name="" id="">
                  <option value="">Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
                <select className="w-full px-2 py-4 rounded-md border border-gray-300 text-[14px] h-14 text-[#323b3b]" name="" id="">
                  <option value="">Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4">4 Bathrooms</option>
                  <option value="5">5+ Bathrooms</option>
                </select>
              </div>
              <button className="w-full px-2 py-4 font-bold leading-tight transition-all hover:bg-[#489fa1] cursor-pointer rounded-md bg-[#2c7a7b] text-white"><FontAwesomeIcon className="text-sm text-white" icon={faMagnifyingGlass} /> Search Properties</button>
            </form>
          </div>
          <div className="w-1/2 p-4 pt-14">
            <div className="w-full rounded-md h-10/12 bg-cover relative bg-center bg-[url('/heroSectionSoldHouse.png')]">
                  <img className="w-48 h-48 rounded-md absolute border-5 shadow-2xl border-white -left-8 -top-8" src="/heroSectionSoldHouoseInterior.png" alt="House interior" />

            </div>  
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
