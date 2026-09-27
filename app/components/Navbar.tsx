"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "fitlog-storage-update",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-update",
        updateCounts
      );
    };
  }, []);

  return (
    <header className="border-b border-gray-800 bg-black">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-wider sm:text-2xl"
        >
          FITLOG
        </Link>

        {/* Navigation */}
        <div className="order-3 flex w-full justify-center gap-6 text-sm sm:order-none sm:w-auto sm:gap-8 sm:text-base">
          <Link
            href="/"
            className="font-medium transition hover:text-lime-400"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="font-medium transition hover:text-lime-400"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-3 py-2 text-xs font-bold text-black sm:px-4 sm:text-sm"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white px-3 py-2 text-xs font-bold sm:px-4 sm:text-sm"
          >
            Saved {savedCount}
          </Link>
        </div>
      </nav>
    </header>
  );
}