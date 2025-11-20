import ContentWrapper from "../contentWrapper";

export default function HomeDiscover() {
  return (
    <section className="min-h-screen">
      <ContentWrapper>
        <div className="flex w-full px-25 pt-25 gap-12">
          <div className="flex flex-col gap-7 w-2/5">
            <h2 className="text-5xl font-light">
              Explore Our Commitment to Your Real Estate Success
            </h2>
            <button className="cursor-pointer font-light w-24 p-2 text-sm rounded-md bg-[#1E1E1E] text-white">
              Learn More
            </button>
          </div>
          <div className="w-3/5 flex flex-col gap-5 px-10 font-light">
            <p className="text-gray-500">
              We are committed to make your real estate experience smooth,
              reqarding and stress-free. Our team of dedicated professionals
              brings years of expertise to the table, helping you navigate the
              real estate market with confidenc. Whether you buying, selling or
              rentin, we are here to offer personalized guidance and ensure your
              goals are met.
            </p>
            <p className="text-gray-500">
              Founded on the principles of trust, transparency, and customer
              satisfaction, we pride ourselves on delivering exceptional
              service. Our comprehensive knowledge of the local market allows us
              to offer a wide range of properties tailored to fit every
              lifestyle and budget. From luxury homes to affordable rentals, we
              provide our clients with the best options to match their needs.
            </p>
          </div>
        </div>
        <div className="px-25 mt-15 flex gap-12">
          <div className="w-[300px] flex flex-col gap-2">
            <img
              className="w-full h-fit bg-cover rounded-2xl"
              src="./discover_card_image1.png"
              alt="Discover Image 1"
            />
            <h4 className="text-3xl font-light">Expert Team</h4>
            <p className="text-gray-500 text-sm font-light">
              Our architects and engineers are leaders in the industry
            </p>
          </div>
          <div className="w-[400px] flex flex-col gap-2 mt-52">
            <img
              className="w-full h-fit bg-cover rounded-2xl"
              src="./discover_card_image2.png"
              alt="Discover Image 2"
            />
            <h4 className="text-3xl font-light">Innovative Designs</h4>
            <p className="text-gray-500 text-sm font-light">
              We push the boundaries of design to create unique spaces that
              inspire and elevate
            </p>
          </div>
          <div className="w-[500px] flex flex-col gap-2">
            <img
              className="w-full h-fit bg-cover rounded-2xl"
              src="./discover_card_image3.png"
              alt="Discover Image 3"
            />
            <h4 className="text-3xl font-light">Client-Centered Approach</h4>
            <p className="text-gray-500 text-sm font-light">
              We work closely to you throughout entire process, ensuring that
              your vision is fully realized.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
