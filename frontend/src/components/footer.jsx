export default function Footer() {
  return (
    <footer className="text-[#323b3b] bg-white text-[14px] border-t border-[#2c7a7b]/25">
      <div className="max-w-[1440px] m-auto lg:px-10 px-2 lg:py-20 py-4">
      <div className="">
        <div className="lg:w-1/3 bg-amber-100 w-full flex flex-col items-start gap-5 ">
          <h3 className="text-3xl font-bold text-[#16353]">HavenSpace</h3>
          <p className="text-[15px] text-[#323b3b] leading-relaxed">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae. Donec velit neque auctor sit amet aliquam vel
            ullamcorper sit amet ligula.
          </p>
          <label className="text-[1rem] font-bold text-[#163535]" htmlFor="contact">Stay Updated</label>
          <form className="w-full flex " action="" method="">
            <input className="w-8/12 bg-white pl-4 py-2 rounded-l-[100px] shadow-2xl " placeholder="Enter your email" type="email" name="contact" id="" />
            <button className="w-2/12 bg-[#2c7a7b] text-xl py-2 transition-all cursor-pointer text-center hover:bg-[#3d9ea0] rounded-r-[100px] text-white">{'>'}</button>
          </form>
        </div>
      </div>
      <div></div>
      </div>
    </footer>
  );
}
