import mongoose from "mongoose";
import {
  CATEGORIES,
  COURSE_TITLES,
  THUMBNAILS,
  VIDEO_POOL,
  type CourseCategory,
  type CourseLevel,
} from "./courseTitles";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildModules(title: string, index: number) {
  return [
    {
      title: "Getting Started",
      description: `Introduction to ${title}`,
      order: 0,
      lessons: [
        {
          title: `Welcome to ${title}`,
          type: "video" as const,
          videoUrl: VIDEO_POOL[index % VIDEO_POOL.length],
          duration: 12 + (index % 8),
          order: 0,
        },
        {
          title: "Course Notes & Resources",
          type: "notes" as const,
          content: `<h2>${title}</h2><p>Study materials and key concepts for this module. Practice regularly and complete all lessons to earn your certificate.</p>`,
          order: 1,
        },
        {
          title: "Module Assessment Quiz",
          type: "quiz" as const,
          order: 2,
        },
      ],
    },
    {
      title: "Hands-on Practice",
      description: "Apply what you learned",
      order: 1,
      lessons: [
        {
          title: "Practical Coding Exercise",
          type: "coding" as const,
          order: 0,
        },
        {
          title: "Advanced Concepts",
          type: "video" as const,
          videoUrl: VIDEO_POOL[(index + 1) % VIDEO_POOL.length],
          duration: 18 + (index % 6),
          order: 1,
        },
      ],
    },
  ];
}

export function generate50Courses(instructorId: mongoose.Types.ObjectId) {
  const courses: Record<string, unknown>[] = [];
  let index = 0;

  for (const category of CATEGORIES) {
    for (const level of ["beginner", "intermediate", "advanced"] as CourseLevel[]) {
      const titles = COURSE_TITLES[category as CourseCategory][level];
      for (const title of titles) {
        courses.push({
          title,
          slug: `${slugify(title)}-${index}`,
          description: `Comprehensive ${level} course on ${title}. Part of our ${category} learning path. Includes video lectures, notes, quizzes, and coding exercises.`,
          thumbnail: THUMBNAILS[category as CourseCategory],
          category,
          level,
          price: 0,
          instructor: instructorId,
          isPublished: true,
          enrolledCount: 50 + Math.floor(Math.random() * 450),
          rating: Number((4.2 + Math.random() * 0.8).toFixed(1)),
          tags: [category.toLowerCase(), level, "programming", "certificate"],
          modules: buildModules(title, index),
        });
        index++;
      }
    }
  }

  return courses;
}
