import ContentWrapper from "../contentWrapper";

export default function HomeHeroSection() {
  return (
    <section className="bg-[url(./heroBackground.png)] bg-cover bg-center">
      <ContentWrapper>
        <div className="flex justify-between items-end">
          {/* wrapper */}
          <div>
            <h1 className="text-7xl tracking-widset text-white">
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
      </ContentWrapper>,
    </section>
  );
}
