"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Search, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  enrolledCount: number;
  rating: number;
  instructor: { name: string };
}

const instructorNames = [
  "Dr. Sarah Johnson",
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
];

const categories = ["All", "Web Development", "Data Structures", "Python", "JavaScript", "Machine Learning"];
const levels = ["All", "beginner", "intermediate", "advanced"];

function shuffle<T>(items: T[]) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getInstructorName(course: Course, index: number) {
  if (course.instructor?.name && course.instructor.name !== "Dr. Sarah Johnson") {
    return course.instructor.name;
  }

  return instructorNames[index % instructorNames.length];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "All") params.set("category", category);
    if (level !== "All") params.set("level", level);

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses?${params}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setCourses(shuffle(data.courses || []));
      } catch (err) {
        console.error("Failed to load courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search, category, level]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Explore Courses</h1>
        <p className="mt-1 text-gray-500">Find the perfect course to advance your skills</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="input-field pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-field w-full sm:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="input-field w-full sm:w-40"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {levels.map((l) => (
            <option key={l} value={l} className="capitalize">{l}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
        </div>
      ) : courses.length === 0 ? (
        <div className="py-20 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">No courses found</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Link
              key={course._id}
              href={`/courses/${course._id}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:border-brand-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <span className={cn(
                  "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold capitalize",
                  course.level === "beginner" && "bg-green-100 text-green-700",
                  course.level === "intermediate" && "bg-yellow-100 text-yellow-700",
                  course.level === "advanced" && "bg-red-100 text-red-700",
                )}>
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-brand-600">{course.category}</span>
                <h3 className="mt-1 font-semibold group-hover:text-brand-600">{course.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{course.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{getInstructorName(course, index)}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.enrolledCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
