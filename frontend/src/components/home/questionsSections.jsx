import Answer from "../Answer";
import ContentWrapper from "../contentWrapper";

export default function AskedQeustions() {
  return (
    <section>
      <ContentWrapper>
        <div className="flex gap-16">
          <div className="w-[40%] flex flex-col gap-10">
            <h2 className="text-5xl font-light w-2/3">Our Property Listings</h2>
            <p className="text-gray-500 font-light">
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
          <div className="w-[55%] px-5">
                <Answer question={'kako si majko kako si oce'} answer={'Dorbro smo svi familjio moja hvala na pitanju hehehehe samo sto sad moram da napisem malo duzi tekst jer ne sme pitanje da bude duze od odgobora'}/>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
