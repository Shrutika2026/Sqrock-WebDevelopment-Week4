"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Filter, HelpCircle, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  timeLimit?: number;
  passingScore: number;
  questions: { question: string; options: string[] }[];
}

const categories = ["All", "Web Development", "Data Structures", "Python", "JavaScript", "Machine Learning"];
const levels = ["All", "beginner", "intermediate", "advanced"];

export default function OnlineTestsPage() {
  const [tests, setTests] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (level !== "All") params.set("level", level);
    const fetchTests = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/quizzes?${params}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setTests(data.quizzes || []);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [category, level]);

  const formatTime = (seconds?: number) => {
    if (!seconds) return "No limit";
    const m = Math.floor(seconds / 60);
    return `${m} min`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Online Tests</h1>
          <p className="mt-1 text-gray-500">Timed MCQ assessments — test your knowledge and track scores</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="input-field w-40 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            className="input-field w-36 py-2 capitalize"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {levels.map((l) => (
              <option key={l} value={l} className="capitalize">{l}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
        </div>
      ) : tests.length === 0 ? (
        <div className="py-20 text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">No tests found. Run npm run seed to load tests.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Link
              key={test._id}
              href={`/tests/${test._id}`}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <HelpCircle className="h-8 w-8 text-brand-600" />
                {test.level && (
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                    test.level === "beginner" && "bg-green-100 text-green-700 dark:bg-green-950",
                    test.level === "intermediate" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-950",
                    test.level === "advanced" && "bg-red-100 text-red-700 dark:bg-red-950",
                  )}>
                    {test.level}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-semibold group-hover:text-brand-600">{test.title}</h3>
              {test.description && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{test.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                {test.category && (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {test.category}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {test.questions?.length || 0} questions
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="h-3.5 w-3.5" />
                  {formatTime(test.timeLimit)}
                </span>
              </div>
              <p className="mt-3 text-xs text-gray-400">Pass: {test.passingScore}%</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
