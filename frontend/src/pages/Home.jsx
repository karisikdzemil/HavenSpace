export default function Home() {
  return (
    <section className="w-full h-screen bg-[url(./heroBackground.png)] bg-cover bg-center">
      <div className="max-w-[1440px] h-screen m-auto p-5 px-10 pb-22 flex justify-between items-end">
        {/* wrapper */}
        <div>
          <h1 className="text-7xl tracking-[0.1em] text-white">
            Discover Your <span className="font-bold">Ideal</span>
            <br /> Living Space <span className="font-bold">Here</span>
          </h1>
        </div>
        <div className="w-[200px] h-[350px] bg-amber-100">
          {/* slider */}
          <div className=""></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
