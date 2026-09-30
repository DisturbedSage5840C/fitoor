export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center bg-maroon-deepest"
    >
      <p className="font-script animate-pulse text-4xl text-gold">one sec...</p>
    </div>
  );
}
