import ContentWrapper from "../contentWrapper";

export default function PropertyDetailSkeleton() {
  return (
    <main className="bg-white min-h-screen pb-20 pt-24 animate-pulse">
      <ContentWrapper>
        <div className="h-6 w-1/3 rounded-full bg-gray-100 mb-6" />

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 max-w-[850px]">
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-10">
              <div className="md:col-span-3 col-span-4 row-span-2 rounded-2xl bg-gray-100" />
              <div className="md:col-span-1 col-span-2 rounded-2xl bg-gray-100" />
              <div className="md:col-span-1 col-span-2 rounded-2xl bg-gray-100" />
            </div>

            <div className="flex flex-wrap gap-8 py-8 border-y border-gray-100 mb-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-24 rounded-xl bg-gray-100" />
              ))}
            </div>

            <div className="space-y-4">
              <div className="h-4 w-full rounded-full bg-gray-100" />
              <div className="h-4 w-full rounded-full bg-gray-100" />
              <div className="h-4 w-2/3 rounded-full bg-gray-100" />
            </div>
          </div>

          <aside className="w-full lg:w-[380px]">
            <div className="bg-gray-100 h-80 rounded-2xl" />
          </aside>
        </div>
      </ContentWrapper>
    </main>
  );
}
