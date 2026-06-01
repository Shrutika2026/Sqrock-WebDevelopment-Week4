"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    tags: string[];
    isPublished: boolean;
    modules: {
      title: string;
      description: string;
      order: number;
      lessons: {
        title: string;
        type: "video" | "notes" | "quiz" | "coding";
        videoUrl?: string;
        content?: string;
        duration?: number;
        order: number;
      }[];
    }[];
  }>({
    title: "",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    category: "Web Development",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    price: 0,
    tags: [] as string[],
    isPublished: true,
    modules: [
      {
        title: "Introduction",
        description: "Getting started",
        order: 0,
        lessons: [
          {
            title: "Welcome to the Course",
            type: "video" as const,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: 10,
            order: 0,
          },
          {
            title: "Course Overview Notes",
            type: "notes" as const,
            content: "<h2>Welcome!</h2><p>In this course, you will learn the fundamentals and build real projects.</p>",
            order: 1,
          },
        ],
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create course");
        return;
      }

      toast.success("Course created successfully!");
      router.push("/instructor/courses");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addModule = () => {
    setForm({
      ...form,
      modules: [
        ...form.modules,
        {
          title: `Module ${form.modules.length + 1}`,
          description: "",
          order: form.modules.length,
          lessons: [],
        },
      ],
    });
  };

  const addLesson = (moduleIndex: number) => {
    const modules = [...form.modules];
    modules[moduleIndex].lessons.push({
      title: "New Lesson",
      type: "video",
      videoUrl: "",
      duration: 5,
      order: modules[moduleIndex].lessons.length,
    });
    setForm({ ...form, modules });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Create New Course</h1>
      <p className="mt-1 text-gray-500">Fill in the details to create your course</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Course Title</label>
          <input
            required
            className="input-field"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Complete Web Development Bootcamp"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Description</label>
          <textarea
            required
            rows={4}
            className="input-field"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe what students will learn..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <select
              className="input-field"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {["Web Development", "Data Structures", "Python", "JavaScript", "Machine Learning"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Level</label>
            <select
              className="input-field"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value as typeof form.level })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Thumbnail URL</label>
          <input
            className="input-field"
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          />
        </div>

        {/* Modules */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Course Modules</label>
            <button type="button" onClick={addModule} className="flex items-center gap-1 text-sm text-brand-600 hover:underline">
              <Plus className="h-4 w-4" /> Add Module
            </button>
          </div>

          {form.modules.map((module, mi) => (
            <div key={mi} className="mt-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <input
                className="input-field mb-3"
                value={module.title}
                onChange={(e) => {
                  const modules = [...form.modules];
                  modules[mi].title = e.target.value;
                  setForm({ ...form, modules });
                }}
                placeholder="Module title"
              />
              <div className="space-y-2">
                {module.lessons.map((lesson, li) => (
                  <div key={li} className="flex gap-2">
                    <input
                      className="input-field flex-1"
                      value={lesson.title}
                      onChange={(e) => {
                        const modules = [...form.modules];
                        modules[mi].lessons[li].title = e.target.value;
                        setForm({ ...form, modules });
                      }}
                      placeholder="Lesson title"
                    />
                    <select
                      className="input-field w-32"
                      value={lesson.type}
                      onChange={(e) => {
                        const modules = [...form.modules];
                        modules[mi].lessons[li].type = e.target.value as "video" | "notes" | "quiz" | "coding";
                        setForm({ ...form, modules });
                      }}
                    >
                      <option value="video">Video</option>
                      <option value="notes">Notes</option>
                      <option value="quiz">Quiz</option>
                      <option value="coding">Coding</option>
                    </select>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addLesson(mi)}
                className="mt-2 text-sm text-brand-600 hover:underline"
              >
                + Add Lesson
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating..." : "Create Course"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
