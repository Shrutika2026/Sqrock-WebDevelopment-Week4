"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Send, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";
import AIAssistant from "@/components/AIAssistant";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  testCases: { input: string; expectedOutput: string }[];
  starterCode: Record<string, string>;
  hints: string[];
  points: number;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  error?: string;
}

const languages = [
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

export default function CodingIDEPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    fetch(`/api/coding/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProblem(data.problem);
        setCode(data.problem.starterCode.javascript);
      });
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || problem.starterCode.javascript);
      setResults([]);
      setStatus(null);
    }
  }, [language, problem]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/coding/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Submission failed");
        return;
      }

      setResults(data.results);
      setStatus(data.status);

      if (data.status === "accepted") {
        toast.success("All test cases passed!");
      } else {
        toast.error("Some test cases failed");
      }
    } catch {
      toast.error("Submission error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!problem) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Problem Panel */}
      <div className="w-full overflow-y-auto border-r border-gray-100 p-6 lg:w-1/2 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">{problem.title}</h1>
          <span className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
            problem.difficulty === "easy" && "bg-green-100 text-green-700",
            problem.difficulty === "medium" && "bg-yellow-100 text-yellow-700",
            problem.difficulty === "hard" && "bg-red-100 text-red-700",
          )}>
            {problem.difficulty}
          </span>
          <span className="text-sm text-gray-500">{problem.points} pts</span>
        </div>

        <div className="prose mt-6 max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: problem.description }} />
        </div>

        {problem.testCases.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Example</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-4 font-mono text-sm dark:bg-gray-900">
              <p><strong>Input:</strong> {problem.testCases[0].input}</p>
              <p className="mt-1"><strong>Output:</strong> {problem.testCases[0].expectedOutput}</p>
            </div>
          </div>
        )}

        {problem.hints.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
            >
              <Lightbulb className="h-4 w-4" /> {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <p className="mt-2 rounded-xl bg-yellow-50 p-4 text-sm dark:bg-yellow-950">
                {problem.hints[0]}
              </p>
            )}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Test Results</h3>
            <div className="mt-2 space-y-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl p-3 text-sm",
                    r.passed ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
                  )}
                >
                  <p className="font-medium">
                    Test Case {i + 1}: {r.passed ? "Passed" : "Failed"}
                  </p>
                  {!r.passed && (
                    <>
                      <p className="mt-1 text-xs">Expected: {r.expected}</p>
                      <p className="text-xs">Got: {r.actual || r.error}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            {status && (
              <div className={cn(
                "mt-3 rounded-xl px-4 py-2 text-center font-semibold",
                status === "accepted" ? "bg-green-600 text-white" : "bg-red-600 text-white"
              )}>
                {status === "accepted" ? "Accepted" : status === "runtime_error" ? "Runtime Error" : "Wrong Answer"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Panel */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2 dark:border-gray-800">
          <div className="flex gap-1">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  language === lang.id
                    ? "bg-brand-600 text-white"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCode(problem.starterCode[language] || "")}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary gap-1 px-4 py-1.5"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Running..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <MonacoEditor
            height="100%"
            language={language === "cpp" ? "cpp" : language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
            }}
          />
        </div>
      </div>

      <AIAssistant
        problemTitle={problem.title}
        code={code}
        language={language}
      />
    </div>
  );
}
