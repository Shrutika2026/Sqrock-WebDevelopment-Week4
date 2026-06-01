"use client";

import { useEffect, useState } from "react";
import { Award, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Certificate {
  _id: string;
  certificateId: string;
  grade: string;
  issuedAt: string;
  course: { title: string; category: string };
  student: { name: string; email: string };
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((data) => {
        setCertificates(data.certificates || []);
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">My Certificates</h1>
        <p className="mt-1 text-gray-500">Certificates earned from completed courses</p>
      </div>

      {certificates.length === 0 ? (
        <div className="py-20 text-center">
          <Award className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-500">No certificates yet. Complete a course to earn one!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              id={`cert-${cert.certificateId}`}
              className="relative overflow-hidden rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-8 dark:border-brand-800 dark:from-brand-950 dark:to-purple-950"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-200/30 dark:bg-brand-800/30" />
              <div className="relative">
                <Award className="h-10 w-10 text-brand-600" />
                <h3 className="mt-4 font-display text-xl font-bold">Certificate of Completion</h3>
                <p className="mt-2 text-lg font-semibold">{cert.course.title}</p>
                <p className="mt-1 text-sm text-gray-500">{cert.course.category}</p>

                <div className="mt-6 space-y-2 text-sm">
                  <p><span className="text-gray-500">Awarded to:</span> <strong>{cert.student.name}</strong></p>
                  <p><span className="text-gray-500">Grade:</span> <strong>{cert.grade}</strong></p>
                  <p><span className="text-gray-500">Date:</span> {formatDate(cert.issuedAt)}</p>
                  <p><span className="text-gray-500">ID:</span> <code className="text-xs">{cert.certificateId}</code></p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="btn-primary mt-6 w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
