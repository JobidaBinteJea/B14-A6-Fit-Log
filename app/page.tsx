export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-4 text-sm font-bold tracking-widest text-lime-400">
          WORKOUT LIBRARY
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>

        <p className="mt-6 max-w-2xl text-gray-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift,
          lock it into today's plan, and watch the week's work add up.
        </p>

        <a
          href="#library"
          className="mt-8 inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black"
        >
          BROWSE WORKOUTS
        </a>
      </section>

      {/* Library */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <h2 className="text-3xl font-bold">THE LIBRARY</h2>

        <p className="mt-2 text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-10 rounded-xl border border-gray-800 p-10 text-center text-gray-500">
          Workout data will appear here.
        </div>
      </section>
    </main>
  );
}