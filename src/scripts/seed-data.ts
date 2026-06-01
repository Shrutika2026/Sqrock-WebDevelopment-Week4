import mongoose from "mongoose";

export const CATEGORIES = [
  "Web Development",
  "Data Structures",
  "Python",
  "JavaScript",
  "Machine Learning",
] as const;

export const LEVELS = ["beginner", "intermediate", "advanced"] as const;

const THUMBNAILS: Record<string, string[]> = {
  "Web Development": [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800",
  ],
  "Data Structures": [
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
  ],
  Python: [
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
  ],
  JavaScript: [
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    "https://images.unsplash.com/photo-1579468118864-1b9ea3c2dbfa?w=800",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  ],
  "Machine Learning": [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    "https://images.unsplash.com/photo-1555255707-c079660383b9?w=800",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
  ],
};

const COURSE_TITLES: Record<string, Record<string, string[]>> = {
  "Web Development": {
    beginner: [
      "HTML & CSS Fundamentals",
      "Introduction to Web Development",
      "Build Your First Website",
      "Responsive Web Design Basics",
    ],
    intermediate: [
      "React.js Complete Guide",
      "Node.js Backend Development",
      "REST API with Express",
      "Full Stack JavaScript Projects",
    ],
    advanced: [
      "Advanced React Patterns & Performance",
      "Microservices with Node.js",
    ],
  },
  "Data Structures": {
    beginner: [
      "Introduction to Data Structures",
      "Arrays and Strings Masterclass",
      "Linked Lists from Scratch",
      "Stacks and Queues Explained",
    ],
    intermediate: [
      "Trees and Binary Search Trees",
      "Graph Algorithms Fundamentals",
      "Sorting & Searching Algorithms",
      "Hash Tables and Maps",
    ],
    advanced: [
      "Advanced Graph Algorithms",
      "Dynamic Programming Mastery",
    ],
  },
  Python: {
    beginner: [
      "Python Programming Basics",
      "Python for Absolute Beginners",
      "Data Types and Control Flow in Python",
      "Functions and Modules in Python",
    ],
    intermediate: [
      "Python for Data Analysis",
      "Object-Oriented Python",
      "Web Scraping with Python",
      "Python Automation Scripts",
    ],
    advanced: [
      "Advanced Python Programming",
      "Python for Machine Learning",
    ],
  },
  JavaScript: {
    beginner: [
      "JavaScript Fundamentals",
      "Modern JavaScript ES6+",
      "DOM Manipulation Mastery",
      "JavaScript for Beginners",
    ],
    intermediate: [
      "Async JavaScript Deep Dive",
      "JavaScript Design Patterns",
      "TypeScript Essentials",
      "JavaScript Testing & Debugging",
    ],
    advanced: [
      "Advanced JavaScript Concepts",
      "JavaScript Interview Mastery",
    ],
  },
  "Machine Learning": {
    beginner: [
      "Introduction to Machine Learning",
      "ML with Python for Beginners",
      "Data Preprocessing Fundamentals",
      "Supervised Learning Basics",
    ],
    intermediate: [
      "Deep Learning with TensorFlow",
      "Natural Language Processing",
      "Computer Vision Fundamentals",
      "Feature Engineering Techniques",
    ],
    advanced: [
      "Advanced Neural Networks",
      "MLOps and Model Deployment",
    ],
  },
};

const VIDEO_URLS = [
  "https://www.youtube.com/embed/W6NZfCO5SIk",
  "https://www.youtube.com/embed/xB3ZmUH6gE4",
  "https://www.youtube.com/embed/_uQrJ0TkZlc",
  "https://www.youtube.com/embed/8hly31xKli0",
  "https://www.youtube.com/embed/3a0I8ICR1Vg",
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateCourses(instructorId: mongoose.Types.ObjectId) {
  const courses: Record<string, unknown>[] = [];
  let index = 0;

  for (const category of CATEGORIES) {
    for (const level of LEVELS) {
      const titles = COURSE_TITLES[category][level];
      for (const title of titles) {
        const thumbs = THUMBNAILS[category];
        courses.push({
          title,
          slug: `${slugify(title)}-${index}`,
          description: `Comprehensive ${level} course on ${title}. Learn practical skills through video lectures, notes, coding exercises, and online tests. Perfect for students pursuing ${category}.`,
          thumbnail: thumbs[index % thumbs.length],
          category,
          level,
          price: 0,
          instructor: instructorId,
          isPublished: true,
          enrolledCount: Math.floor(Math.random() * 400) + 50,
          rating: +(4 + Math.random() * 0.9).toFixed(1),
          tags: [category.toLowerCase(), level, "programming"],
          modules: [
            {
              title: `Module 1: ${title.split(" ")[0]} Basics`,
              description: `Introduction to ${title}`,
              order: 0,
              lessons: [
                {
                  title: `Introduction to ${title}`,
                  type: "video",
                  videoUrl: VIDEO_URLS[index % VIDEO_URLS.length],
                  duration: 12 + (index % 8),
                  order: 0,
                },
                {
                  title: "Study Notes & Key Concepts",
                  type: "notes",
                  content: `<h2>${title}</h2><p>This module covers essential ${level} concepts in ${category}. Study the material carefully before attempting the quiz and coding exercises.</p><ul><li>Core concepts and terminology</li><li>Practical examples</li><li>Best practices</li></ul>`,
                  order: 1,
                },
                {
                  title: `${category} Online Test`,
                  type: "quiz",
                  order: 2,
                },
                {
                  title: "Coding Challenge",
                  type: "coding",
                  order: 3,
                },
              ],
            },
            {
              title: `Module 2: Advanced ${title.split(" ")[0]} Topics`,
              order: 1,
              lessons: [
                {
                  title: "Deep Dive Video Lecture",
                  type: "video",
                  videoUrl: VIDEO_URLS[(index + 1) % VIDEO_URLS.length],
                  duration: 18 + (index % 10),
                  order: 0,
                },
                {
                  title: "Practice Quiz",
                  type: "quiz",
                  order: 1,
                },
                {
                  title: "Final Coding Assessment",
                  type: "coding",
                  order: 2,
                },
              ],
            },
          ],
        });
        index++;
      }
    }
  }

  return courses;
}

export function generateQuizzes(
  courses: { _id: mongoose.Types.ObjectId; title: string; category: string; level: string }[]
) {
  const questionBank: Record<string, { q: string; opts: string[]; ans: number; exp: string }[]> = {
    "Web Development": [
      { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"], ans: 0, exp: "HTML stands for Hyper Text Markup Language." },
      { q: "Which CSS property controls text size?", opts: ["font-style", "text-size", "font-size", "text-transform"], ans: 2, exp: "font-size controls the size of text." },
      { q: "Which tag is used for the largest heading?", opts: ["<head>", "<h6>", "<h1>", "<heading>"], ans: 2, exp: "<h1> defines the most important heading." },
      { q: "What does CSS stand for?", opts: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], ans: 1, exp: "CSS stands for Cascading Style Sheets." },
      { q: "Which property makes a flex container?", opts: ["display: flex", "flex: 1", "position: flex", "layout: flex"], ans: 0, exp: "display: flex creates a flex container." },
    ],
    "Data Structures": [
      { q: "Time complexity of accessing array element by index?", opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"], ans: 2, exp: "Array access by index is O(1)." },
      { q: "Which follows LIFO principle?", opts: ["Queue", "Stack", "Array", "Tree"], ans: 1, exp: "Stack follows Last In First Out." },
      { q: "Worst case search in balanced BST?", opts: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], ans: 1, exp: "Balanced BST search is O(log n)." },
      { q: "Which is NOT a linear data structure?", opts: ["Array", "Linked List", "Tree", "Queue"], ans: 2, exp: "Tree is a non-linear data structure." },
      { q: "Bubble sort average complexity?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], ans: 2, exp: "Bubble sort has O(n²) average complexity." },
    ],
    Python: [
      { q: "Which is used to define a function in Python?", opts: ["function", "def", "fun", "define"], ans: 1, exp: "Python uses 'def' to define functions." },
      { q: "Which is mutable in Python?", opts: ["Tuple", "String", "List", "Integer"], ans: 2, exp: "Lists are mutable in Python." },
      { q: "Output of print(2 ** 3)?", opts: ["6", "8", "9", "5"], ans: 1, exp: "2 ** 3 = 8 (exponentiation)." },
      { q: "Which library is used for data analysis?", opts: ["NumPy", "Pandas", "Matplotlib", "Requests"], ans: 1, exp: "Pandas is the primary data analysis library." },
      { q: "How to create a virtual environment?", opts: ["python -m venv env", "pip install venv", "python create env", "virtualenv create"], ans: 0, exp: "python -m venv env creates a virtual environment." },
    ],
    JavaScript: [
      { q: "Which keyword declares block-scoped variable?", opts: ["var", "let", "define", "const only"], ans: 1, exp: "'let' declares block-scoped variables." },
      { q: "typeof null returns?", opts: ["null", "undefined", "object", "number"], ans: 2, exp: "typeof null returns 'object' (legacy bug)." },
      { q: "Which adds element to end of array?", opts: ["push()", "pop()", "shift()", "append()"], ans: 0, exp: "push() adds to the end of an array." },
      { q: "Promise has how many states?", opts: ["2", "3", "4", "5"], ans: 1, exp: "Pending, fulfilled, and rejected." },
      { q: "=== checks?", opts: ["Value only", "Type only", "Value and type", "Reference only"], ans: 2, exp: "Strict equality checks value and type." },
    ],
    "Machine Learning": [
      { q: "Supervised learning uses?", opts: ["Unlabeled data", "Labeled data", "No data", "Random data"], ans: 1, exp: "Supervised learning uses labeled data." },
      { q: "Overfitting means?", opts: ["Model too simple", "Model memorizes training data", "Model is perfect", "Undertrained model"], ans: 1, exp: "Overfitting means memorizing training data." },
      { q: "Which is a classification algorithm?", opts: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"], ans: 1, exp: "Logistic Regression is for classification." },
      { q: "Train/test split purpose?", opts: ["Speed up training", "Evaluate generalization", "Reduce data size", "Remove outliers"], ans: 1, exp: "Split evaluates how well model generalizes." },
      { q: "Gradient descent is used for?", opts: ["Data cleaning", "Optimization", "Visualization", "Feature selection"], ans: 1, exp: "Gradient descent optimizes model parameters." },
    ],
  };

  const quizzes = courses.flatMap((course, i) => {
    const questions = questionBank[course.category] || questionBank["JavaScript"];
    return [
      {
        title: `${course.title} - Module 1 Test`,
        description: `Online test for ${course.title}. ${course.level} level.`,
        courseId: course._id,
        category: course.category,
        level: course.level,
        passingScore: 60,
        totalPoints: 100,
        timeLimit: 600,
        questions: questions.map((q) => ({
          question: q.q,
          options: q.opts,
          correctAnswer: q.ans,
          explanation: q.exp,
        })),
      },
      {
        title: `${course.title} - Final Assessment`,
        description: `Final assessment for ${course.title}.`,
        courseId: course._id,
        category: course.category,
        level: course.level,
        passingScore: 70,
        totalPoints: 100,
        timeLimit: 900,
        questions: [...questions].reverse().map((q) => ({
          question: q.q,
          options: [...q.opts].reverse(),
          correctAnswer: q.opts.length - 1 - q.ans,
          explanation: q.exp,
        })),
      },
    ];
  });

  return quizzes;
}

const starterJs = (comment: string) => `function solution(input) {
  // ${comment}
  
}`;

export const CODING_PROBLEMS = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "<p>Given an array <code>nums</code> and integer <code>target</code>, return indices of two numbers that add up to target.</p>",
    difficulty: "easy" as const,
    category: "Arrays",
    points: 10,
    hints: ["Use a hash map to store complements"],
    testCases: [
      { input: "[[2,7,11,15], 9]", expectedOutput: "[0,1]" },
      { input: "[[3,2,4], 6]", expectedOutput: "[1,2]" },
    ],
    starterCode: {
      javascript: `function solution(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];
    map.set(nums[i], i);
  }
}`,
      python: "def solution(nums, target):\n    pass",
      java: "public int[] solution(int[] nums, int target) { return new int[]{}; }",
      cpp: "vector<int> solution(vector<int>& nums, int target) { return {}; }",
    },
  },
  {
    title: "Reverse a String",
    slug: "reverse-string",
    description: "<p>Reverse the given string and return it.</p>",
    difficulty: "easy" as const,
    category: "Strings",
    points: 10,
    hints: ["Use two pointers or built-in reverse"],
    testCases: [
      { input: '"hello"', expectedOutput: "olleh" },
      { input: '"CodeLearn"', expectedOutput: "nraeLedoC" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  return s.split('').reverse().join('');
}`,
      python: "def solution(s):\n    return s[::-1]",
      java: 'public String solution(String s) { return new StringBuilder(s).reverse().toString(); }',
      cpp: "string solution(string s) { reverse(s.begin(), s.end()); return s; }",
    },
  },
  {
    title: "FizzBuzz",
    slug: "fizzbuzz",
    description: "<p>Given n, return FizzBuzz string: multiples of 3 → Fizz, 5 → Buzz, both → FizzBuzz, else number.</p>",
    difficulty: "easy" as const,
    category: "Math",
    points: 10,
    hints: ["Check divisibility by 3 and 5"],
    testCases: [
      { input: "3", expectedOutput: "Fizz" },
      { input: "5", expectedOutput: "Buzz" },
      { input: "15", expectedOutput: "FizzBuzz" },
      { input: "7", expectedOutput: "7" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}`,
      python: "def solution(n):\n    pass",
      java: "public String solution(int n) { return \"\"; }",
      cpp: "string solution(int n) { return \"\"; }",
    },
  },
  {
    title: "Find Maximum in Array",
    slug: "find-max-array",
    description: "<p>Return the maximum number in the given array.</p>",
    difficulty: "easy" as const,
    category: "Arrays",
    points: 10,
    hints: ["Iterate and track max"],
    testCases: [
      { input: "[1,5,3,9,2]", expectedOutput: "9" },
      { input: "[-1,-5,-3]", expectedOutput: "-1" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return Math.max(...nums);
}`,
      python: "def solution(nums):\n    pass",
      java: "public int solution(int[] nums) { return 0; }",
      cpp: "int solution(vector<int>& nums) { return 0; }",
    },
  },
  {
    title: "Palindrome Number",
    slug: "palindrome-number",
    description: "<p>Return true if the number reads the same forwards and backwards.</p>",
    difficulty: "easy" as const,
    category: "Math",
    points: 10,
    hints: ["Convert to string and compare"],
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "123", expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  const s = String(n);
  return s === s.split('').reverse().join('');
}`,
      python: "def solution(n):\n    pass",
      java: "public boolean solution(int n) { return false; }",
      cpp: "bool solution(int n) { return false; }",
    },
  },
  {
    title: "Count Vowels",
    slug: "count-vowels",
    description: "<p>Count the number of vowels (a,e,i,o,u) in the given string.</p>",
    difficulty: "easy" as const,
    category: "Strings",
    points: 10,
    hints: ["Loop through each character"],
    testCases: [
      { input: '"hello"', expectedOutput: "2" },
      { input: '"aeiou"', expectedOutput: "5" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  return s.toLowerCase().split('').filter(c => 'aeiou'.includes(c)).length;
}`,
      python: "def solution(s):\n    pass",
      java: "public int solution(String s) { return 0; }",
      cpp: "int solution(string s) { return 0; }",
    },
  },
  {
    title: "Sum of Array",
    slug: "sum-array",
    description: "<p>Return the sum of all elements in the array.</p>",
    difficulty: "easy" as const,
    category: "Arrays",
    points: 10,
    hints: ["Use reduce or loop"],
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "15" },
      { input: "[10,-2,3]", expectedOutput: "11" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return nums.reduce((a, b) => a + b, 0);
}`,
      python: "def solution(nums):\n    pass",
      java: "public int solution(int[] nums) { return 0; }",
      cpp: "int solution(vector<int>& nums) { return 0; }",
    },
  },
  {
    title: "Factorial",
    slug: "factorial",
    description: "<p>Return factorial of n (n!).</p>",
    difficulty: "easy" as const,
    category: "Math",
    points: 10,
    hints: ["Multiply from 1 to n"],
    testCases: [
      { input: "5", expectedOutput: "120" },
      { input: "0", expectedOutput: "1" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}`,
      python: "def solution(n):\n    pass",
      java: "public int solution(int n) { return 0; }",
      cpp: "int solution(int n) { return 0; }",
    },
  },
  {
    title: "Fibonacci Number",
    slug: "fibonacci",
    description: "<p>Return the nth Fibonacci number (0-indexed: F(0)=0, F(1)=1).</p>",
    difficulty: "easy" as const,
    category: "Math",
    points: 15,
    hints: ["Use iteration or recursion"],
    testCases: [
      { input: "6", expectedOutput: "8" },
      { input: "10", expectedOutput: "55" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) { const t = a + b; a = b; b = t; }
  return b;
}`,
      python: "def solution(n):\n    pass",
      java: "public int solution(int n) { return 0; }",
      cpp: "int solution(int n) { return 0; }",
    },
  },
  {
    title: "Check Prime Number",
    slug: "check-prime",
    description: "<p>Return true if n is a prime number, false otherwise.</p>",
    difficulty: "easy" as const,
    category: "Math",
    points: 15,
    hints: ["Check divisibility up to sqrt(n)"],
    testCases: [
      { input: "7", expectedOutput: "true" },
      { input: "4", expectedOutput: "false" },
      { input: "2", expectedOutput: "true" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
}`,
      python: "def solution(n):\n    pass",
      java: "public boolean solution(int n) { return false; }",
      cpp: "bool solution(int n) { return false; }",
    },
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: "<p>Determine if the input string of brackets is valid.</p>",
    difficulty: "medium" as const,
    category: "Stack",
    points: 20,
    hints: ["Use a stack"],
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" },
    ],
    starterCode: {
      javascript: starterJs("Use a stack to match brackets"),
      python: "def solution(s):\n    pass",
      java: "public boolean solution(String s) { return false; }",
      cpp: "bool solution(string s) { return false; }",
    },
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: "<p>Find the contiguous subarray with the largest sum.</p>",
    difficulty: "medium" as const,
    category: "Dynamic Programming",
    points: 25,
    hints: ["Kadane's algorithm"],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  let max = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(max, cur);
  }
  return max;
}`,
      python: "def solution(nums):\n    pass",
      java: "public int solution(int[] nums) { return 0; }",
      cpp: "int solution(vector<int>& nums) { return 0; }",
    },
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    description: "<p>Search target in sorted array. Return index or -1.</p>",
    difficulty: "medium" as const,
    category: "Searching",
    points: 20,
    hints: ["Use two pointers left and right"],
    testCases: [
      { input: "[[-1,0,3,5,9,12], 9]", expectedOutput: "4" },
      { input: "[[-1,0,3,5,9,12], 2]", expectedOutput: "-1" },
    ],
    starterCode: {
      javascript: `function solution(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1; else r = m - 1;
  }
  return -1;
}`,
      python: "def solution(nums, target):\n    pass",
      java: "public int solution(int[] nums, int target) { return -1; }",
      cpp: "int solution(vector<int>& nums, int target) { return -1; }",
    },
  },
  {
    title: "Remove Duplicates from Array",
    slug: "remove-duplicates",
    description: "<p>Return array with duplicates removed, preserving order.</p>",
    difficulty: "medium" as const,
    category: "Arrays",
    points: 20,
    hints: ["Use a Set"],
    testCases: [
      { input: "[1,2,2,3,4,4,5]", expectedOutput: "[1,2,3,4,5]" },
      { input: "[1,1,1]", expectedOutput: "[1]" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return [...new Set(nums)];
}`,
      python: "def solution(nums):\n    pass",
      java: "public int[] solution(int[] nums) { return new int[]{}; }",
      cpp: "vector<int> solution(vector<int>& nums) { return {}; }",
    },
  },
  {
    title: "Anagram Check",
    slug: "anagram-check",
    description: "<p>Return true if two strings are anagrams of each other.</p>",
    difficulty: "medium" as const,
    category: "Strings",
    points: 20,
    hints: ["Sort both strings and compare"],
    testCases: [
      { input: '["listen", "silent"]', expectedOutput: "true" },
      { input: '["hello", "world"]', expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(s, t) {
  const sort = str => str.split('').sort().join('');
  return sort(s) === sort(t);
}`,
      python: "def solution(s, t):\n    pass",
      java: "public boolean solution(String s, String t) { return false; }",
      cpp: "bool solution(string s, string t) { return false; }",
    },
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-sorted-lists",
    description: "<p>Merge two sorted arrays into one sorted array.</p>",
    difficulty: "hard" as const,
    category: "Linked List",
    points: 30,
    hints: ["Two pointer merge"],
    testCases: [
      { input: "[[1,2,4], [1,3,4]]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[[], [1]]", expectedOutput: "[1]" },
    ],
    starterCode: {
      javascript: `function solution(a, b) {
  const r = []; let i = 0, j = 0;
  while (i < a.length && j < b.length) r.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return r.concat(a.slice(i)).concat(b.slice(j));
}`,
      python: "def solution(a, b):\n    pass",
      java: "public int[] solution(int[] a, int[] b) { return new int[]{}; }",
      cpp: "vector<int> solution(vector<int>& a, vector<int>& b) { return {}; }",
    },
  },
  {
    title: "GCD of Two Numbers",
    slug: "gcd",
    description: "<p>Return the Greatest Common Divisor of two numbers.</p>",
    difficulty: "medium" as const,
    category: "Math",
    points: 15,
    hints: ["Euclidean algorithm"],
    testCases: [
      { input: "[48, 18]", expectedOutput: "6" },
      { input: "[100, 25]", expectedOutput: "25" },
    ],
    starterCode: {
      javascript: `function solution(a, b) {
  while (b) { const t = b; b = a % b; a = t; }
  return a;
}`,
      python: "def solution(a, b):\n    pass",
      java: "public int solution(int a, int b) { return 0; }",
      cpp: "int solution(int a, int b) { return 0; }",
    },
  },
  {
    title: "Sort Array Ascending",
    slug: "sort-array",
    description: "<p>Return the array sorted in ascending order.</p>",
    difficulty: "easy" as const,
    category: "Sorting",
    points: 10,
    hints: ["Use built-in sort"],
    testCases: [
      { input: "[3,1,4,1,5,9]", expectedOutput: "[1,1,3,4,5,9]" },
      { input: "[5,4,3,2,1]", expectedOutput: "[1,2,3,4,5]" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return [...nums].sort((a, b) => a - b);
}`,
      python: "def solution(nums):\n    pass",
      java: "public int[] solution(int[] nums) { return new int[]{}; }",
      cpp: "vector<int> solution(vector<int>& nums) { return {}; }",
    },
  },
  {
    title: "Find Missing Number",
    slug: "find-missing-number",
    description: "<p>Array contains n distinct numbers from 0 to n. Find the missing one.</p>",
    difficulty: "medium" as const,
    category: "Arrays",
    points: 20,
    hints: ["Sum formula: n*(n+1)/2"],
    testCases: [
      { input: "[3,0,1]", expectedOutput: "2" },
      { input: "[0,1]", expectedOutput: "2" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}`,
      python: "def solution(nums):\n    pass",
      java: "public int solution(int[] nums) { return 0; }",
      cpp: "int solution(vector<int>& nums) { return 0; }",
    },
  },
  {
    title: "Power of Two",
    slug: "power-of-two",
    description: "<p>Return true if n is a power of two.</p>",
    difficulty: "easy" as const,
    category: "Bit Manipulation",
    points: 10,
    hints: ["n & (n-1) === 0 for powers of 2"],
    testCases: [
      { input: "16", expectedOutput: "true" },
      { input: "3", expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      python: "def solution(n):\n    pass",
      java: "public boolean solution(int n) { return false; }",
      cpp: "bool solution(int n) { return false; }",
    },
  },
  {
    title: "Reverse Array",
    slug: "reverse-array",
    description: "<p>Return the array reversed.</p>",
    difficulty: "easy" as const,
    category: "Arrays",
    points: 10,
    hints: ["Use reverse or two pointers"],
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1]", expectedOutput: "[1]" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return [...nums].reverse();
}`,
      python: "def solution(nums):\n    pass",
      java: "public int[] solution(int[] nums) { return new int[]{}; }",
      cpp: "vector<int> solution(vector<int>& nums) { return {}; }",
    },
  },
  {
    title: "Sum of Digits",
    slug: "sum-of-digits",
    description: "<p>Return the sum of all digits of the given number.</p>",
    difficulty: "easy" as const,
    category: "Math",
    points: 10,
    hints: ["Modulo 10 to get last digit"],
    testCases: [
      { input: "123", expectedOutput: "6" },
      { input: "9999", expectedOutput: "36" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  return String(n).split('').reduce((s, d) => s + Number(d), 0);
}`,
      python: "def solution(n):\n    pass",
      java: "public int solution(int n) { return 0; }",
      cpp: "int solution(int n) { return 0; }",
    },
  },
  {
    title: "Longest Word in String",
    slug: "longest-word",
    description: "<p>Return the longest word in the sentence.</p>",
    difficulty: "easy" as const,
    category: "Strings",
    points: 10,
    hints: ["Split by spaces"],
    testCases: [
      { input: '"The quick brown fox"', expectedOutput: "quick" },
      { input: '"hello world"', expectedOutput: "hello" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  return s.split(' ').reduce((a, b) => a.length >= b.length ? a : b);
}`,
      python: "def solution(s):\n    pass",
      java: "public String solution(String s) { return \"\"; }",
      cpp: "string solution(string s) { return \"\"; }",
    },
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    description: "<p>You can climb 1 or 2 steps. How many distinct ways to reach step n?</p>",
    difficulty: "medium" as const,
    category: "Dynamic Programming",
    points: 25,
    hints: ["Fibonacci pattern"],
    testCases: [
      { input: "3", expectedOutput: "3" },
      { input: "5", expectedOutput: "8" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) { const t = a + b; a = b; b = t; }
  return b;
}`,
      python: "def solution(n):\n    pass",
      java: "public int solution(int n) { return 0; }",
      cpp: "int solution(int n) { return 0; }",
    },
  },
  {
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    description: "<p>Return true if any value appears at least twice in the array.</p>",
    difficulty: "easy" as const,
    category: "Arrays",
    points: 10,
    hints: ["Use a Set"],
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return new Set(nums).size !== nums.length;
}`,
      python: "def solution(nums):\n    pass",
      java: "public boolean solution(int[] nums) { return false; }",
      cpp: "bool solution(vector<int>& nums) { return false; }",
    },
  },
];
