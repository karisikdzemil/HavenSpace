import ContentWrapper from "./contentWrapper";
import PropertyCard from "./propertyCard/PropertyCard";

export default function PropertyListingsSections({ title, text, properties }) {
  return (
    <section>
      <ContentWrapper>
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-light ">{title}</h2>
          <p className="text-gray-500 w-2/5">{text}</p>
        </div>
        <div className="py-22">
          <ul>
            {properties &&
              properties.map((propertie) => (
                <PropertyCard key={propertie._id} propertie={propertie} />
              ))}
          </ul>
        </div>
      </ContentWrapper>
    </section>
  );
}
