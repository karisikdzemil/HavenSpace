export default function Footer() {
  return (
    <footer className="h-[50vh] w-full bg-[#1E1E1E]">
      <div className="max-w-[1440px] p-10 ">
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="text-white text-3xl font-light">We are an experienced real <br /> estate agency based in Serbia</h3>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
                <p className="text-gray-500 font-light text-sm">mail</p>
                <p className="text-white font-light">karisikdzemil@gmail.com</p>
            </div>
             <div className="flex flex-col gap-3">
                <p className="text-gray-500 font-light text-sm">Phone</p>
                <p className="text-white font-light">+381 640302888</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>Navigation</p>
            
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  );
}
