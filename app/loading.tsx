export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-lime-400" />

        <p className="mt-5 font-bold text-lime-400">
          Loading FitLog...
        </p>
      </div>
    </main>
  );
}