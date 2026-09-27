"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: number;
  rating: number;
};

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/fitlog")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch workouts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-bold tracking-[0.3em] text-lime-400">
          WORKOUT LIBRARY
        </p>

        <h1 className="max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift,
          lock it into today's plan, and watch the week's work add up.
        </p>

        <a
          href="#library"
          className="mt-8 inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          BROWSE WORKOUTS
        </a>
      </section>

      {/* LIBRARY */}
      <section
        id="library"
        className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16"
      >
        <div className="mb-10">
          <p className="text-sm font-bold tracking-[0.2em] text-lime-400">
            EXPLORE
          </p>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-xl font-bold text-lime-400">
              Loading workouts...
            </p>
          </div>
        )}

        {/* WORKOUT CARDS */}
        {!loading && workouts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group block overflow-hidden rounded-xl border border-gray-800 bg-gray-950 transition hover:-translate-y-1 hover:border-lime-400"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* CARD CONTENT */}
                <div className="p-5">
                  {/* MUSCLE TAGS */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* NAME */}
                  <h3 className="text-xl font-bold uppercase">
                    {workout.name}
                  </h3>

                  {/* EQUIPMENT */}
                  <p className="mt-2 text-sm text-gray-400">
                    Equipment: {workout.equipment}
                  </p>

                  {/* DIFFICULTY */}
                  <p className="mt-1 text-sm text-gray-400">
                    Difficulty: {workout.difficulty}
                  </p>

                  {/* STATS */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-800 pt-4 text-center text-sm">
                    <div>
                      <p className="font-bold text-white">
                        {workout.duration}
                      </p>
                      <p className="text-xs text-gray-500">MIN</p>
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        {workout.caloriesBurned}
                      </p>
                      <p className="text-xs text-gray-500">KCAL</p>
                    </div>

                    <div>
                      <p className="font-bold text-lime-400">
                        ★ {workout.rating}
                      </p>
                      <p className="text-xs text-gray-500">RATING</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && workouts.length === 0 && (
          <div className="rounded-xl border border-red-900 bg-red-950/30 p-10 text-center">
            <h3 className="text-xl font-bold text-red-400">
              No workouts found
            </h3>

            <p className="mt-2 text-gray-400">
              We could not load the workout data. Please try again later.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}