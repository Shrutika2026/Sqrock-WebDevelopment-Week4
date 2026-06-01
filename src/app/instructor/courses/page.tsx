"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Edit, Eye, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  category: string;
  level: string;
  isPublished: boolean;
  enrolledCount: number;
}

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instructor/stats")
      .then((r) => r.json())
      .then((data) => {
        const courseList = (data.courseStats || []).map((c: { courseId: string; title: string; isPublished: boolean; enrolled: number }) => ({
          _id: c.courseId,
          title: c.title,
          isPublished: c.isPublished,
          enrolledCount: c.enrolled,
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
          category: "General",
          level: "beginner",
        }));
        setCourses(courseList);
        setLoading(false);
      });
  }, []);

  const togglePublish = async (courseId: string, current: boolean) => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });

      if (res.ok) {
        setCourses((prev) =>
          prev.map((c) => (c._id === courseId ? { ...c, isPublished: !current } : c))
        );
        toast.success(current ? "Course unpublished" : "Course published!");
      }
    } catch {
      toast.error("Failed to update course");
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
        toast.success("Course deleted");
      }
    } catch {
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">My Courses</h1>
          <p className="mt-1 text-gray-500">Create and manage your courses</p>
        </div>
        <Link href="/instructor/courses/new" className="btn-primary gap-2">
          <Plus className="h-4 w-4" />
          New Course
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
        </div>
      ) : courses.length === 0 ? (
        <div className="py-20 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">No courses created yet</p>
          <Link href="/instructor/courses/new" className="btn-primary mt-4 inline-flex">
            Create Course
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="relative h-40">
                <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                <span className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  course.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{course.enrolledCount} students enrolled</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/courses/${course._id}`}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <Eye className="h-4 w-4" /> View
                  </Link>
                  <button
                    onClick={() => togglePublish(course._id, course.isPublished)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-50 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300"
                  >
                    <Edit className="h-4 w-4" />
                    {course.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
