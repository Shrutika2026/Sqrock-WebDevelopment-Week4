"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpen,
  Code2,
  GraduationCap,
  HelpCircle,
  TrendingUp,
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
import AIAssistant from "@/components/AIAssistant";

interface Stats {
  enrolledCourses: number;
  completedCourses: number;
  codingProblemsSolved: number;
  averageQuizScore: number;
  certificatesEarned: number;
  totalProgress: number;
}

interface Enrollment {
  _id: string;
  progress: number;
  course: { _id: string; title: string; thumbnail: string };
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progressData, setProgressData] = useState<{ course: string; progress: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/stats").then((r) => r.json()),
      fetch("/api/enrollments").then((r) => r.json()),
    ]).then(([statsData, enrollData]) => {
      setStats(statsData.stats);
      setProgressData(statsData.progressData || []);
      setEnrollments(enrollData.enrollments || []);
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
    { label: "Enrolled Courses", value: stats?.enrolledCourses || 0, icon: BookOpen, color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
    { label: "Problems Solved", value: stats?.codingProblemsSolved || 0, icon: Code2, color: "text-green-600 bg-green-50 dark:bg-green-950" },
    { label: "Avg Quiz Score", value: `${stats?.averageQuizScore || 0}%`, icon: TrendingUp, color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
    { label: "Certificates", value: stats?.certificatesEarned || 0, icon: Award, color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Student Dashboard</h1>
        <p className="mt-1 text-gray-500">Track your learning progress and continue where you left off</p>
      </div>

      {/* Stats Grid */}
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

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Continue Learning</h2>
              <Link href="/courses" className="text-sm font-medium text-brand-600 hover:underline">
                Browse Courses
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="mt-8 text-center py-12">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">No courses enrolled yet</p>
                <Link href="/courses" className="btn-primary mt-4 inline-flex">
                  Explore Courses
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {enrollments.map((enrollment) => (
                  <Link
                    key={enrollment._id}
                    href={`/courses/${enrollment.course._id}/learn`}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-all hover:border-brand-200 hover:shadow-md dark:border-gray-800"
                  >
                    <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{enrollment.course.title}</h3>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className="h-2 rounded-full bg-brand-600 transition-all"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-brand-600">{enrollment.progress}%</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress Chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">Course Progress</h2>
          {progressData.length > 0 ? (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="course" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-8 text-center text-sm text-gray-500">Enroll in courses to see progress</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/coding" className="stat-card group hover:border-brand-200">
          <Code2 className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold group-hover:text-brand-600">Coding Practice</h3>
          <p className="mt-1 text-sm text-gray-500">Solve coding challenges</p>
        </Link>
        <Link href="/tests" className="stat-card group hover:border-brand-200">
          <HelpCircle className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold group-hover:text-brand-600">Online Tests</h3>
          <p className="mt-1 text-sm text-gray-500">Timed MCQ assessments</p>
        </Link>
        <Link href="/courses" className="stat-card group hover:border-brand-200">
          <BookOpen className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold group-hover:text-brand-600">Browse Courses</h3>
          <p className="mt-1 text-sm text-gray-500">Discover new courses</p>
        </Link>
        <Link href="/certificates" className="stat-card group hover:border-brand-200">
          <Award className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold group-hover:text-brand-600">My Certificates</h3>
          <p className="mt-1 text-sm text-gray-500">View earned certificates</p>
        </Link>
      </div>

      <AIAssistant />
    </div>
  );
}
