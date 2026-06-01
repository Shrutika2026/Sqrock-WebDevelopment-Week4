"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Play,
  Code2,
} from "lucide-react";
import toast from "react-hot-toast";
import AIAssistant from "@/components/AIAssistant";
import { cn } from "@/lib/utils";

interface Lesson {
  _id: string;
  title: string;
  type: "video" | "notes" | "quiz" | "coding";
  videoUrl?: string;
  content?: string;
  duration?: number;
  order: number;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface Course {
  _id: string;
  title: string;
  modules: Module[];
}

export default function CourseLearnPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/courses/${id}`).then((r) => r.json()),
      fetch("/api/enrollments").then((r) => r.json()),
    ]).then(([courseData, enrollData]) => {
      setCourse(courseData.course);
      const enrollment = enrollData.enrollments?.find(
        (e: { course: { _id: string } }) => e.course._id === id
      );
      if (enrollment) {
        setCompletedLessons(enrollment.completedLessons || []);
      }
      setLoading(false);
    });
  }, [id]);

  const allLessons = course?.modules.flatMap((m, mi) =>
    m.lessons.map((l, li) => ({ ...l, moduleIndex: mi, lessonIndex: li, moduleTitle: m.title }))
  ) || [];

  const flatIndex = course?.modules
    .slice(0, currentModule)
    .reduce((acc, m) => acc + m.lessons.length, 0) || 0;
  const activeLesson = course?.modules[currentModule]?.lessons[currentLesson];
  const activeLessonId = activeLesson?._id?.toString() || `${currentModule}-${currentLesson}`;

  const markComplete = async () => {
    try {
      const res = await fetch("/api/enrollments/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: activeLessonId, courseId: id }),
      });

      if (res.ok) {
        setCompletedLessons((prev) =>
          prev.includes(activeLessonId) ? prev : [...prev, activeLessonId]
        );
        toast.success("Lesson marked as complete!");
      }
    } catch {
      toast.error("Failed to update progress");
    }
  };

  const goNext = () => {
    const mod = course!.modules[currentModule];
    if (currentLesson < mod.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < course!.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
    }
  };

  const goPrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentLesson(course!.modules[currentModule - 1].lessons.length - 1);
    }
  };

  if (loading || !course || !activeLesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  const lessonIcons = {
    video: Play,
    notes: FileText,
    quiz: HelpCircle,
    coding: Code2,
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full border-r border-gray-100 bg-gray-50 lg:w-80 lg:overflow-y-auto dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-100 p-4 dark:border-gray-800">
          <Link href={`/courses/${id}`} className="text-sm text-brand-600 hover:underline">
            &larr; Back to course
          </Link>
          <h2 className="mt-2 font-semibold">{course.title}</h2>
        </div>
        <div className="p-2">
          {course.modules.map((module, mi) => (
            <div key={mi} className="mb-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                {module.title}
              </p>
              {module.lessons.map((lesson, li) => {
                const lessonId = lesson._id?.toString() || `${mi}-${li}`;
                const Icon = lessonIcons[lesson.type];
                const isActive = mi === currentModule && li === currentLesson;
                const isComplete = completedLessons.includes(lessonId);

                return (
                  <button
                    key={li}
                    onClick={() => {
                      setCurrentModule(mi);
                      setCurrentLesson(li);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      isActive
                        ? "bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                    ) : (
                      <Icon className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-bold">{activeLesson.title}</h1>
          <p className="mt-1 text-sm capitalize text-gray-500">{activeLesson.type} lesson</p>

          <div className="mt-6">
            {activeLesson.type === "video" && activeLesson.videoUrl && (
              <div className="aspect-video overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={activeLesson.videoUrl}
                  className="h-full w-full"
                  allowFullScreen
                  title={activeLesson.title}
                />
              </div>
            )}

            {activeLesson.type === "notes" && (
              <div className="prose max-w-none rounded-2xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: activeLesson.content || "" }} />
              </div>
            )}

            {activeLesson.type === "quiz" && (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                <HelpCircle className="mx-auto h-12 w-12 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">Online Test</h3>
                <p className="mt-2 text-gray-500">Take a timed MCQ assessment for this module</p>
                <Link href="/tests" className="btn-primary mt-4 inline-flex">
                  Take Online Test
                </Link>
              </div>
            )}

            {activeLesson.type === "coding" && (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                <Code2 className="mx-auto h-12 w-12 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">Coding Exercise</h3>
                <p className="mt-2 text-gray-500">Practice coding with this exercise</p>
                <Link href="/coding" className="btn-primary mt-4 inline-flex">
                  Go to Coding IDE
                </Link>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={goPrev} className="btn-secondary gap-1" disabled={currentModule === 0 && currentLesson === 0}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button onClick={markComplete} className="btn-primary gap-1">
              <CheckCircle className="h-4 w-4" /> Mark Complete
            </button>
            <button
              onClick={goNext}
              className="btn-secondary gap-1"
              disabled={
                currentModule === course.modules.length - 1 &&
                currentLesson === course.modules[currentModule].lessons.length - 1
              }
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      <AIAssistant context={`Course: ${course.title}, Lesson: ${activeLesson.title}`} />
    </div>
  );
}
