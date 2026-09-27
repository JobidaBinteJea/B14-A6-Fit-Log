import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
          404
        </p>

        <h1 className="mt-4 text-5xl font-black">
          WORKOUT NOT FOUND
        </h1>

        <p className="mt-4 text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black"
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}