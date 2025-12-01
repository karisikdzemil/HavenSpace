import ContentWrapper from "../contentWrapper";

export default function AskedQeustions() {
  return (
    <section>
      <ContentWrapper>
        <div>
          <div className="w-[40%] flex flex-col gap-10">
            <h2 className="text-5xl font-light w-2/3">Our Property Listings</h2>
            <p className="text-gray-500 ">
              Discover your dream property from our curated selection of hosues,
              apartments, and villas. Whether you're looking to buy or rent, we
              offer a variety of options to suit your lifestyle and budget.
            </p>
           <img
              className="w-full h-fit bg-cover rounded-2xl"
              src="./questions_image.png"
              alt="Discover Image 3"
            />
          </div>
          <div className="w-[60%]">

          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
