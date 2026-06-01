"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Code2, Filter, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Problem {
  _id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  points: number;
  solvedCount: number;
}

const difficultyColors = {
  easy: "text-green-600 bg-green-50 dark:bg-green-950",
  medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950",
  hard: "text-red-600 bg-red-50 dark:bg-red-950",
};

export default function CodingPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty !== "All") params.set("difficulty", difficulty);

    fetch(`/api/coding?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProblems(data.problems || []);
        setLoading(false);
      });
  }, [difficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Coding Practice</h1>
          <p className="mt-1 text-gray-500">Solve problems and improve your skills</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          {["All", "easy", "medium", "hard"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                difficulty === d
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-sm dark:border-gray-800 dark:bg-gray-900">
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Problem</th>
                <th className="px-6 py-4 font-medium">Difficulty</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Points</th>
                <th className="px-6 py-4 font-medium">Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {problems.map((problem) => (
                <tr
                  key={problem._id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-6 py-4">
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/coding/${problem._id}`}
                      className="font-medium hover:text-brand-600"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", difficultyColors[problem.difficulty])}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{problem.category}</td>
                  <td className="px-6 py-4 text-sm">{problem.points}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{problem.solvedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
