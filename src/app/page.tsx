import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
  LineChart,
  Play,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import AIAssistant from "@/components/AIAssistant";

const features = [
  {
    icon: BookOpen,
    title: "Structured Courses",
    description: "Video lectures, notes, and modules designed by expert instructors.",
  },
  {
    icon: Code2,
    title: "Live Coding IDE",
    description: "Practice with JavaScript, Python, Java & C++ in a built-in code editor.",
  },
  {
    icon: Bot,
    title: "AI Doubt Assistant",
    description: "Get instant help with coding doubts, errors, and personalized hints.",
  },
  {
    icon: Brain,
    title: "AI Quiz Generator",
    description: "Auto-generated quizzes to test your knowledge on any topic.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visual dashboards showing your learning journey and performance.",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn verified certificates upon course completion.",
  },
];

const stats = [
  { value: "50+", label: "Courses" },
  { value: "200+", label: "Coding Problems" },
  { value: "10K+", label: "Students" },
  { value: "95%", label: "Satisfaction" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-brand-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzQUYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggIGQ9Ik0zNiAzNGg2djZoLTZ6TTAgMzRoNnY2SDB6TTAgMGg2djZIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-slide-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning Platform
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Learn to Code with{" "}
                <span className="gradient-text">Intelligence</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
                Master programming through interactive courses, live coding challenges,
                AI-powered doubt resolution, and earn industry-recognized certificates.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary gap-2">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/courses" className="btn-secondary gap-2">
                  <Play className="h-4 w-4" />
                  Browse Courses
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-100 text-xs font-bold text-brand-700 dark:border-gray-950 dark:bg-brand-900 dark:text-brand-300"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Trusted by 10,000+ learners</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="glass-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-gray-400">solution.js</span>
                </div>
                <pre className="overflow-x-auto rounded-xl bg-gray-950 p-4 text-sm text-green-400">
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`}
                </pre>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 dark:bg-green-950">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    All test cases passed
                  </span>
                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                    Accepted
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 animate-float rounded-xl border border-gray-100 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                    <Bot className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AI Assistant</p>
                    <p className="text-sm font-medium">Try using a HashMap!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-brand-600">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              A complete learning ecosystem with courses, coding practice, AI assistance, and progress tracking.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:border-brand-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-800"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold">How It Works</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Sign Up", desc: "Create your free account as a student or instructor", icon: Users },
              { step: "02", title: "Enroll", desc: "Browse and enroll in courses that match your goals", icon: BookOpen },
              { step: "03", title: "Learn & Code", desc: "Watch lectures, solve problems, take quizzes", icon: Code2 },
              { step: "04", title: "Get Certified", desc: "Complete courses and earn verified certificates", icon: GraduationCap },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-brand-600">STEP {item.step}</span>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-purple-600 px-8 py-16 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggIGQ9Ik0zNiAzNGg2djZoLTZ6TTAgMzRoNnY2SDB6TTAgMGg2djZIMHoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
            <div className="relative">
              <Shield className="mx-auto h-12 w-12 opacity-80" />
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Ready to Start Your Coding Journey?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-brand-100">
                Join thousands of students learning with AI-powered tools. Free to start, no credit card required.
              </p>
              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-brand-600 shadow-lg transition-all hover:bg-brand-50"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AIAssistant />
    </>
  );
}
