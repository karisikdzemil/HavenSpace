import ContentWrapper from "./contentWrapper";

export default function PropertyListingsSections( { properties } ) {
  return (
    <section>
      <ContentWrapper>
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-light ">Our Property Listings</h2>
          <p className="text-gray-500 w-2/5">
            Discover your dream property from our curated selection of hosues, 
            apartments, and villas. Whether you're looking to buy or rent, we 
            offer a variety of options to suit your lifestyle and budget.
          </p>
        </div>

        <ul>
        {properties && properties.map((propertie, i) => (
          <li key={i}>
            <h3>{propertie.title}</h3>
            <h3>{propertie.price}</h3>
            <h3>{propertie.description}</h3>
          </li>
        ))}
        </ul>

      </ContentWrapper>
    </section>
  );
}
