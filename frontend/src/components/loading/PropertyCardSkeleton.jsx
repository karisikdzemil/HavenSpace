export default function PropertyCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-4xl p-4 border border-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] animate-pulse">
      <div className="w-full h-64 rounded-3xl bg-gray-100" />
      <div className="mt-6 px-2 space-y-3">
        <div className="h-5 w-3/4 rounded-full bg-gray-100" />
        <div className="h-3 w-1/2 rounded-full bg-gray-100" />
        <div className="my-5 h-px w-full bg-gray-50" />
        <div className="grid grid-cols-2 gap-y-4">
          <div className="h-3 w-2/3 rounded-full bg-gray-100" />
          <div className="h-3 w-2/3 rounded-full bg-gray-100" />
          <div className="h-3 w-2/3 rounded-full bg-gray-100" />
          <div className="h-3 w-2/3 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function PropertyCardSkeletonGrid({ count = 6, className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
