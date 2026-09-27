"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

type Tab = "plan" | "saved";

export default function MyPlan() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const completed = JSON.parse(
      localStorage.getItem("fitlog-completed") || "[]"
    );

    setPlanIds(plan);
    setSavedIds(saved);
    setCompletedIds(completed);

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

  const removeFromPlan = (id: number) => {
    const updatedPlan = planIds.filter(
      (workoutId) => workoutId !== id
    );

    setPlanIds(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );
  };

  const removeFromSaved = (id: number) => {
    const updatedSaved = savedIds.filter(
      (workoutId) => workoutId !== id
    );

    setSavedIds(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );
  };

  const markAsDone = (id: number) => {
    if (completedIds.includes(id)) {
      return;
    }

    const updatedCompleted = [...completedIds, id];

    setCompletedIds(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompleted)
    );
  };

  const activeIds =
    activeTab === "plan" ? planIds : savedIds;

  const activeWorkouts = workouts.filter((workout) =>
    activeIds.includes(workout.id)
  );

  const totalCalories = planIds.reduce((total, id) => {
    const workout = workouts.find(
      (item) => item.id === id
    );

    return total + (workout?.caloriesBurned || 0);
  }, 0);

  const totalMinutes = planIds.reduce((total, id) => {
    const workout = workouts.find(
      (item) => item.id === id
    );

    return total + (workout?.duration || 0);
  }, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <section>
        <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-2 text-4xl font-black md:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Manage your selected workouts and keep track of
          your training progress.
        </p>
      </section>

      {/* Metrics */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">PLANNED WORKOUTS</p>

          <p className="mt-2 text-3xl font-black text-lime-400">
            {planIds.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">TOTAL TIME</p>

          <p className="mt-2 text-3xl font-black">
            {totalMinutes} min
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">TOTAL CALORIES</p>

          <p className="mt-2 text-3xl font-black">
            {totalCalories} kcal
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="mt-12">
        <div className="flex gap-3 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-lg px-5 py-3 font-bold ${
              activeTab === "plan"
                ? "bg-lime-400 text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            TODAY'S PLAN ({planIds.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-5 py-3 font-bold ${
              activeTab === "saved"
                ? "bg-lime-400 text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            SAVED ({savedIds.length})
          </button>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center">
          <p className="text-xl font-bold text-lime-400">
            Loading your workouts...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && activeWorkouts.length === 0 && (
        <div className="mt-10 rounded-xl border border-gray-800 bg-gray-950 p-12 text-center">
          <h2 className="text-2xl font-bold">
            {activeTab === "plan"
              ? "Your plan is empty"
              : "No saved workouts"}
          </h2>

          <p className="mt-3 text-gray-400">
            {activeTab === "plan"
              ? "Add workouts from the library to build your plan."
              : "Save workouts that you want to try later."}
          </p>

          <Link
            href="/#library"
            className="mt-6 inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black"
          >
            BROWSE WORKOUTS
          </Link>
        </div>
      )}

      {/* Workout List */}
      {!loading && activeWorkouts.length > 0 && (
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {activeWorkouts.map((workout) => {
            const isCompleted = completedIds.includes(
              workout.id
            );

            return (
              <article
                key={workout.id}
                className={`overflow-hidden rounded-xl border bg-gray-950 ${
                  isCompleted
                    ? "border-lime-400"
                    : "border-gray-800"
                }`}
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-4 text-2xl font-black uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  <div className="mt-5 grid grid-cols-3 border-t border-gray-800 pt-4 text-center">
                    <div>
                      <p className="font-bold">
                        {workout.duration}
                      </p>

                      <p className="text-xs text-gray-500">
                        MIN
                      </p>
                    </div>

                    <div>
                      <p className="font-bold">
                        {workout.caloriesBurned}
                      </p>

                      <p className="text-xs text-gray-500">
                        KCAL
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-lime-400">
                        ★ {workout.rating}
                      </p>

                      <p className="text-xs text-gray-500">
                        RATING
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {activeTab === "plan" && (
                      <button
                        onClick={() =>
                          markAsDone(workout.id)
                        }
                        disabled={isCompleted}
                        className={`rounded-lg px-4 py-2 text-sm font-bold ${
                          isCompleted
                            ? "cursor-not-allowed bg-gray-700 text-gray-400"
                            : "bg-lime-400 text-black hover:bg-lime-300"
                        }`}
                      >
                        {isCompleted
                          ? "✓ DONE"
                          : "MARK AS DONE"}
                      </button>
                    )}

                    {activeTab === "plan" ? (
                      <button
                        onClick={() =>
                          removeFromPlan(workout.id)
                        }
                        className="rounded-lg border border-red-500 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        REMOVE
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          removeFromSaved(workout.id)
                        }
                        className="rounded-lg border border-red-500 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        REMOVE
                      </button>
                    )}

                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-bold hover:border-white"
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}