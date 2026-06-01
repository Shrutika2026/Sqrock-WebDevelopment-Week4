"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface InstructorStats {
  totalCourses: number;
  publishedCourses: number;
  totalStudents: number;
  totalEnrollments: number;
  avgProgress: number;
}

interface CourseStat {
  courseId: string;
  title: string;
  enrolled: number;
  avgProgress: number;
  isPublished: boolean;
}

export default function InstructorDashboard() {
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [courseStats, setCourseStats] = useState<CourseStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instructor/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats);
        setCourseStats(data.courseStats || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    { label: "Total Courses", value: stats?.totalCourses || 0, icon: BookOpen, color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
    { label: "Total Students", value: stats?.totalStudents || 0, icon: Users, color: "text-green-600 bg-green-50 dark:bg-green-950" },
    { label: "Enrollments", value: stats?.totalEnrollments || 0, icon: TrendingUp, color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
    { label: "Avg Progress", value: `${stats?.avgProgress || 0}%`, icon: BarChart3, color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Instructor Dashboard</h1>
          <p className="mt-1 text-gray-500">Manage your courses and track student analytics</p>
        </div>
        <Link href="/instructor/courses/new" className="btn-primary gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="mt-1 text-2xl font-bold">{card.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">Course Analytics</h2>
          {courseStats.length > 0 ? (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseStats}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="title" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrolled" fill="#6366f1" name="Enrolled" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgProgress" fill="#a855f7" name="Avg Progress %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-8 text-center text-sm text-gray-500">Create a course to see analytics</p>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Courses</h2>
            <Link href="/instructor/courses" className="text-sm font-medium text-brand-600 hover:underline">
              View All
            </Link>
          </div>
          {courseStats.length === 0 ? (
            <div className="mt-8 text-center py-8">
              <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-500">No courses yet</p>
              <Link href="/instructor/courses/new" className="btn-primary mt-4 inline-flex">
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {courseStats.map((course) => (
                <div
                  key={course.courseId}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-gray-800"
                >
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-gray-500">
                      {course.enrolled} students &middot; {course.avgProgress}% avg progress
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    course.isPublished
                      ? "bg-green-100 text-green-700 dark:bg-green-950"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800"
                  }`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
