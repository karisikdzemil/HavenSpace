import ContentWrapper from "../contentWrapper";

export default function AgentProfileSkeleton() {
  return (
    <main className="bg-[#FBFCFC] min-h-screen pt-6 md:pt-12 pb-16 md:pb-24 animate-pulse">
      <ContentWrapper>
        <div className="h-4 w-40 rounded-full bg-gray-100 mb-10" />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mb-16">
          <div className="w-full lg:w-[400px] shrink-0 bg-white rounded-4xl border border-gray-100 p-8 space-y-6">
            <div className="aspect-square rounded-3xl bg-gray-100" />
            <div className="h-6 w-2/3 mx-auto rounded-full bg-gray-100" />
            <div className="h-3 w-1/2 mx-auto rounded-full bg-gray-100" />
          </div>
          <div className="flex-1 space-y-6 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-3xl bg-white border border-gray-50" />
              ))}
            </div>
            <div className="h-4 w-full rounded-full bg-gray-100" />
            <div className="h-4 w-3/4 rounded-full bg-gray-100" />
          </div>
        </div>
      </ContentWrapper>
    </main>
  );
}
