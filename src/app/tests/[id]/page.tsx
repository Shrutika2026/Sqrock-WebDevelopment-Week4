"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  timeLimit?: number;
  passingScore: number;
  questions: { question: string; options: string[] }[];
}

interface Result {
  question: string;
  correct: boolean;
  correctAnswer: number;
  explanation?: string;
}

export default function TakeTestPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/quizzes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setQuiz(data.quiz);
        setAnswers(Array(data.quiz.questions.length).fill(-1));
        setTimeLeft(data.quiz.timeLimit || 0);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = useCallback(async () => {
    if (!quiz || submitted) return;

    try {
      const res = await fetch(`/api/quizzes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Submission failed");
        return;
      }

      setScore(data.score);
      setPassed(data.passed);
      setResults(data.results);
      setSubmitted(true);

      if (data.passed) toast.success(`Passed with ${data.score}%!`);
      else toast.error(`Score: ${data.score}% — keep practicing!`);
    } catch {
      toast.error("Failed to submit test");
    }
  }, [quiz, submitted, id, answers]);

  useEffect(() => {
    if (!quiz?.timeLimit || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, submitted, handleSubmit]);

  if (loading || !quiz) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className={cn(
          "rounded-2xl border-2 p-8 text-center",
          passed ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
        )}>
          {passed ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-600" />
          )}
          <h1 className="mt-4 font-display text-3xl font-bold">
            {passed ? "Test Passed!" : "Test Completed"}
          </h1>
          <p className="mt-2 text-5xl font-bold text-brand-600">{score}%</p>
          <p className="mt-2 text-gray-500">
            {results.filter((r) => r.correct).length} / {results.length} correct
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Review Answers</h2>
          {results.map((r, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border p-4",
                r.correct ? "border-green-200 bg-green-50/50 dark:border-green-900" : "border-red-200 bg-red-50/50 dark:border-red-900"
              )}
            >
              <p className="font-medium">Q{i + 1}. {r.question}</p>
              {r.explanation && (
                <p className="mt-2 text-sm text-gray-500">{r.explanation}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/tests" className="btn-secondary">Back to Tests</Link>
          <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  const q = quiz.questions[currentQ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/tests" className="flex items-center gap-1 text-sm text-brand-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        {quiz.timeLimit ? (
          <div className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold",
            timeLeft < 60 ? "bg-red-100 text-red-700" : "bg-brand-100 text-brand-700 dark:bg-brand-950"
          )}>
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        ) : null}
      </div>

      <h1 className="font-display text-2xl font-bold">{quiz.title}</h1>
      {quiz.description && <p className="mt-1 text-gray-500">{quiz.description}</p>}

      <div className="mt-4 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-2 rounded-full bg-brand-600 transition-all"
          style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Question {currentQ + 1} of {quiz.questions.length}
      </p>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold">{q.question}</h2>
        <div className="mt-6 space-y-3">
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                const next = [...answers];
                next[currentQ] = i;
                setAnswers(next);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all",
                answers[currentQ] === i
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-950"
                  : "border-gray-200 hover:border-brand-300 dark:border-gray-700"
              )}
            >
              <span className={cn(
                "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold",
                answers[currentQ] === i ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800"
              )}>
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
          disabled={currentQ === 0}
          className="btn-secondary gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>

        {currentQ < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQ((c) => c + 1)}
            className="btn-primary gap-1"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answers.some((a) => a === -1)}
            className="btn-primary"
          >
            Submit Test
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={cn(
              "h-8 w-8 rounded-lg text-xs font-medium",
              currentQ === i ? "bg-brand-600 text-white" :
              answers[i] >= 0 ? "bg-brand-100 text-brand-700 dark:bg-brand-950" :
              "bg-gray-100 text-gray-500 dark:bg-gray-800"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
