import ContentWrapper from "./contentWrapper";
import PropertyCard from "./propertyCard/PropertyCard";

export default function PropertyListingsSections({ title, text, properties }) {
  const isZeroProperties = <div className="w-full h-screen flex flex-col items-center justify-center"><p className="text-3xl font-bold text-[#1E1E1E]">There are no properties posted!</p></div>
  return (
    <section>
      <ContentWrapper>
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-light ">{title}</h2>
          <p className="text-gray-500 w-2/5">{text}</p>
        </div>
       {properties.length === 0 ? isZeroProperties : <div className="py-22">
          <ul className="w-full h-auto flex items-center justify-center flex-row flex-wrap gap-7">
            {properties &&
              properties.map((propertie) => (
                <PropertyCard key={propertie._id} propertie={propertie} />
              ))}
          </ul>
        </div>}
      </ContentWrapper>
    </section>
  );
}
