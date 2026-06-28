export default function AgentCardSkeleton() {
  return (
    <div className="bg-white rounded-4xl border border-gray-100 p-4 animate-pulse">
      <div className="h-64 rounded-3xl bg-gray-100 mb-6" />
      <div className="px-2 pb-2 space-y-4">
        <div className="h-5 w-2/3 rounded-full bg-gray-100" />
        <div className="h-3 w-1/3 rounded-full bg-gray-100" />
        <div className="space-y-3 py-4 border-t border-gray-50">
          <div className="h-3 w-1/2 rounded-full bg-gray-100" />
          <div className="h-3 w-1/2 rounded-full bg-gray-100" />
        </div>
        <div className="h-10 w-full rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

export function AgentCardSkeletonGrid({ count = 4, className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <AgentCardSkeleton key={i} />
      ))}
    </div>
  );
}
