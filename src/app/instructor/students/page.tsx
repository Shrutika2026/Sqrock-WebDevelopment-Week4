"use client";

import { useEffect, useState } from "react";
import { Users, Mail, BookOpen, TrendingUp } from "lucide-react";

interface Enrollment {
  _id: string;
  progress: number;
  enrolledAt: string;
  student: { name: string; email: string };
  course: { title: string };
}

export default function InstructorStudentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instructor/stats")
      .then((r) => r.json())
      .then((data) => {
        setEnrollments(data.recentEnrollments || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Student Management</h1>
        <p className="mt-1 text-gray-500">View and track your enrolled students</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
        </div>
      ) : enrollments.length === 0 ? (
        <div className="py-20 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">No student enrollments yet</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-sm dark:border-gray-800 dark:bg-gray-900">
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium">Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900">
                        {enrollment.student?.name?.charAt(0) || "?"}
                      </div>
                      <span className="font-medium">{enrollment.student?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {enrollment.student?.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                      {enrollment.course?.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-2 rounded-full bg-brand-600"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
