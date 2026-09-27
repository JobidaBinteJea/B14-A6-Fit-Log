"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
    const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("fitlog-storage-update", updateCounts);

    return () => {
      window.removeEventListener("fitlog-storage-update", updateCounts);
    };
  }, []);

  return (
    <header className="border-b border-gray-800">
      <nav className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-wider"
        >
          FITLOG
        </Link>

        {/* Navigation */}
        <div className="flex gap-8">
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
        <div className="flex gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-4 py-2 font-bold text-black"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white px-4 py-2 font-bold"
          >
            Saved {savedCount}
          </Link>
        </div>
      </nav>
    </header>
  );
}