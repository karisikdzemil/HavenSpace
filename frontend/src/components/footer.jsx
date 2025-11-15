export default function Footer() {
  return (
    <footer className="h-[50vh] w-full bg-[#1E1E1E]">
      <div className="max-w-[1440px] p-10 flex flex-col justify-between">
        <div className="flex justify-between px-12 p-10">
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="text-white text-3xl font-light">
              We are an experienced real <br /> estate agency based in Serbia
            </h3>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 font-light text-sm">Mail</p>
              <p className="text-white font-light">karisikdzemil@gmail.com</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 font-light text-sm">Phone</p>
              <p className="text-white font-light">+381 640302888</p>
            </div>
          </div>
        </div>
        <div className="flex gap-22">
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 font-light ">Navigation</p>
            <ul className="flex flex-col gap-4">
              <li className="text-white font-light cursor-pointer">Home</li>
              <li className="text-white font-light cursor-pointer">Properties</li>
              <li className="text-white font-light cursor-pointer">Contact</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 font-light ">Follow Us</p>
            <ul className="flex flex-col gap-4">
              <li className="text-white font-light cursor-pointer">Linkedin</li>
              <li className="text-white font-light cursor-pointer">Github</li>
              <li className="text-white font-light cursor-pointer">Instagram</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between border-t-2 border-gray-500 h-[10vh] px-12 items-center">
            <h3 className="text-2xl font-bold text-white">HavenSpace</h3>
            <p className="text-sm text-gray-500">2025, All Rights Reserved</p>
            <p className="text-white cursor-pointer">Back to top</p>
      </div>
      </div>
    </footer>
  );
}
