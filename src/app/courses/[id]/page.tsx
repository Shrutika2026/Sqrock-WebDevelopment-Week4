"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Play,
  Star,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  enrolledCount: number;
  rating: number;
  modules: {
    title: string;
    lessons: { _id: string; title: string; type: string; duration?: number }[];
  }[];
  instructor: { name: string; bio?: string };
}

const instructorNames = [
  "Prof. Emma Collins",
  "Mr. David Chen",
  "Ms. Aisha Malik",
  "Dr. Michael Patel",
  "Prof. Anna Rivera",
  "Mr. Daniel Brooks",
  "Ms. Chloe Bennett",
  "Dr. Kevin Wong",
  "Prof. Olivia Evans",
  "Ms. Rosa Herrera",
  "Mr. Isaac Turner",
  "Dr. Priya Narayan",
  "Ms. Maya Brooks",
  "Prof. Julian Park",
  "Dr. Nina Ross",
  "Ms. Zoe Carter",
];

function getInstructorName(courseId: string, currentName?: string) {
  if (currentName && currentName !== "Dr. Sarah Johnson") {
    return currentName;
  }

  const hash = courseId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return instructorNames[hash % instructorNames.length];
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCourse(data.course);
        setEnrolled(!!data.enrollment);
        setLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await fetch(`/api/courses/${id}/enroll`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        toast.error(data.error || "Enrollment failed");
        return;
      }

      toast.success("Enrolled successfully!");
      setEnrolled(true);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return <div className="py-20 text-center">Course not found</div>;
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
            <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold">{course.title}</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{course.description}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {course.rating} rating</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.enrolledCount} students</span>
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {totalLessons} lessons</span>
            <span className="capitalize rounded-full bg-brand-50 px-3 py-0.5 text-brand-700 dark:bg-brand-950 dark:text-brand-300">{course.level}</span>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Course Curriculum</h2>
            <div className="mt-4 space-y-4">
              {course.modules.map((module, mi) => (
                <div key={mi} className="rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="bg-gray-50 px-5 py-3 font-medium dark:bg-gray-900">
                    Module {mi + 1}: {module.title}
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {module.lessons.map((lesson, li) => (
                      <div key={li} className="flex items-center gap-3 px-5 py-3 text-sm">
                        <Play className="h-4 w-4 text-gray-400" />
                        <span className="flex-1">{lesson.title}</span>
                        <span className="capitalize text-xs text-gray-400">{lesson.type}</span>
                        {lesson.duration && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="h-3 w-3" /> {lesson.duration}m
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500">Instructor</p>
            <p className="mt-1 font-semibold">{getInstructorName(course._id, course.instructor.name)}</p>
            {course.instructor.bio && (
              <p className="mt-2 text-sm text-gray-500">{course.instructor.bio}</p>
            )}

            <div className="mt-6">
              {enrolled ? (
                <Link href={`/courses/${course._id}/learn`} className="btn-primary w-full gap-2">
                  <Play className="h-4 w-4" />
                  Continue Learning
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn-primary w-full"
                >
                  {enrolling ? "Enrolling..." : "Enroll for Free"}
                </button>
              )}
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {["Lifetime access", "Certificate on completion", "AI doubt assistant", "Coding exercises"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
