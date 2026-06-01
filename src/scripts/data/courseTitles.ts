export const CATEGORIES = [
  "Web Development",
  "Data Structures",
  "Python",
  "JavaScript",
  "Machine Learning",
] as const;

export type CourseCategory = (typeof CATEGORIES)[number];
export type CourseLevel = "beginner" | "intermediate" | "advanced";

/** 10 titles per category: [beginner×4, intermediate×3, advanced×3] */
export const COURSE_TITLES: Record<CourseCategory, Record<CourseLevel, string[]>> = {
  "Web Development": {
    beginner: [
      "HTML & CSS Fundamentals",
      "Responsive Web Design Bootcamp",
      "Introduction to Web Development",
      "Building Your First Website",
    ],
    intermediate: [
      "React.js Complete Guide",
      "Node.js Backend Development",
      "Full-Stack MERN Development",
    ],
    advanced: [
      "Next.js Production Applications",
      "Advanced CSS & Animations",
      "Web Performance Optimization",
    ],
  },
  "Data Structures": {
    beginner: [
      "Introduction to Data Structures",
      "Arrays and Strings Masterclass",
      "Programming Logic Fundamentals",
    ],
    intermediate: [
      "Linked Lists and Stacks",
      "Trees and Graphs Essentials",
      "Sorting and Searching Algorithms",
      "Hash Tables and Heaps",
    ],
    advanced: [
      "Advanced Algorithm Design",
      "Competitive Programming Prep",
      "Dynamic Programming Mastery",
    ],
  },
  Python: {
    beginner: [
      "Python Programming Basics",
      "Python for Absolute Beginners",
      "Learn Python in 30 Days",
      "Python Automation Scripts",
    ],
    intermediate: [
      "Python OOP and Design Patterns",
      "Python Web Development with Flask",
      "Data Analysis with Pandas",
    ],
    advanced: [
      "Advanced Python Programming",
      "Python System Design",
      "Async Python and Concurrency",
    ],
  },
  JavaScript: {
    beginner: [
      "JavaScript from Zero to Hero",
      "Modern JavaScript ES6+",
      "DOM Manipulation Workshop",
    ],
    intermediate: [
      "Async JavaScript Deep Dive",
      "JavaScript Design Patterns",
      "TypeScript for JavaScript Developers",
      "JavaScript Testing with Jest",
    ],
    advanced: [
      "JavaScript Performance Tuning",
      "Building JavaScript Frameworks",
      "Advanced Functional JavaScript",
    ],
  },
  "Machine Learning": {
    beginner: [
      "Introduction to Machine Learning",
      "ML with Python for Beginners",
      "Data Science Fundamentals",
      "Statistics for ML",
    ],
    intermediate: [
      "Supervised Learning Algorithms",
      "Neural Networks Basics",
      "Natural Language Processing Intro",
    ],
    advanced: [
      "Deep Learning with TensorFlow",
      "Computer Vision Applications",
      "ML Model Deployment",
    ],
  },
};

export const THUMBNAILS: Record<CourseCategory, string> = {
  "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  "Data Structures": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
  Python: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
  JavaScript: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
  "Machine Learning": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
};

export const VIDEO_POOL = [
  "https://www.youtube.com/embed/W6NZfCO5SIk",
  "https://www.youtube.com/embed/_uQrJ0TkZlc",
  "https://www.youtube.com/embed/8hly31xKli0",
  "https://www.youtube.com/embed/xB3ZmUH6gE4",
  "https://www.youtube.com/embed/3a0I8ICR1Vg",
];
