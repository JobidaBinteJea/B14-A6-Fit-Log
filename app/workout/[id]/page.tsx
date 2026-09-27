import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/WorkoutActions";

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
  description: string;
  instructions: string[];
};

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(
      `https://api.api-store.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch workout:", error);
    return null;
  }
}

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Back Button */}
      <Link
        href="/#library"
        className="mb-8 inline-block text-sm font-bold text-lime-400 hover:text-lime-300"
      >
        ← BACK TO LIBRARY
      </Link>

      {/* Details */}
      <section className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-gray-800">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full max-h-[600px] w-full object-cover"
          />
        </div>

        {/* Information */}
        <div>
          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black uppercase md:text-5xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-6 leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-gray-800 p-4">
              <p className="text-xs text-gray-500">DURATION</p>
              <p className="mt-1 text-xl font-bold">
                {workout.duration} min
              </p>
            </div>

            <div className="rounded-lg border border-gray-800 p-4">
              <p className="text-xs text-gray-500">CALORIES</p>
              <p className="mt-1 text-xl font-bold">
                {workout.caloriesBurned}
              </p>
            </div>

            <div className="rounded-lg border border-gray-800 p-4">
              <p className="text-xs text-gray-500">SETS</p>
              <p className="mt-1 text-xl font-bold">
                {workout.sets}
              </p>
            </div>

            <div className="rounded-lg border border-gray-800 p-4">
              <p className="text-xs text-gray-500">RATING</p>
              <p className="mt-1 text-xl font-bold text-lime-400">
                ★ {workout.rating}
              </p>
            </div>
          </div>

          {/* Equipment & Difficulty */}
          <div className="mt-8 space-y-3 border-t border-gray-800 pt-6">
            <p>
              <span className="font-bold">Equipment:</span>{" "}
              <span className="text-gray-400">{workout.equipment}</span>
            </p>

            <p>
              <span className="font-bold">Difficulty:</span>{" "}
              <span className="text-gray-400">{workout.difficulty}</span>
            </p>

            <p>
              <span className="font-bold">Reps:</span>{" "}
              <span className="text-gray-400">{workout.reps}</span>
            </p>
          </div>

          {/* Instructions */}
          <div className="mt-8 border-t border-gray-800 pt-6">
            <h2 className="text-2xl font-bold">HOW TO DO IT</h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-gray-400"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-black">
                    {index + 1}
                  </span>

                  <span className="leading-7">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <WorkoutActions workoutId={workout.id} />
        </div>
      </section>
    </main>
  );
}