"use client";

import { useState } from "react";

type WorkoutActionsProps = {
  workoutId: number;
};

export default function WorkoutActions({
  workoutId,
}: WorkoutActionsProps) {
  const [message, setMessage] = useState("");

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const addToPlan = () => {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    if (plan.includes(workoutId)) {
      showMessage("This workout is already in your plan.");
      return;
    }

    plan.push(workoutId);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );

    showMessage("Workout added to today's plan!");
  };

  const saveForLater = () => {
    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    if (saved.includes(workoutId)) {
      showMessage("This workout is already saved.");
      return;
    }

    saved.push(workoutId);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );

    showMessage("Workout saved for later!");
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={addToPlan}
          className="rounded-lg bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          ADD TO TODAY'S PLAN
        </button>

        <button
          onClick={saveForLater}
          className="rounded-lg border border-white px-6 py-3 font-bold transition hover:bg-white hover:text-black"
        >
          SAVE FOR LATER
        </button>
      </div>

      {/* Toast */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-lime-400 bg-gray-950 px-5 py-4 text-sm font-medium shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}