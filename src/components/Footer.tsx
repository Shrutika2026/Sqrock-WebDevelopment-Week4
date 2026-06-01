import Link from "next/link";
import { Code2, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold">
                Code<span className="text-brand-600">Learn</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              AI-powered learning platform for coding education. Learn, practice, and earn certificates.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/courses" className="hover:text-brand-600">Courses</Link></li>
              <li><Link href="/coding" className="hover:text-brand-600">Coding Practice</Link></li>
              <li><Link href="/register" className="hover:text-brand-600">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Features</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>AI Doubt Assistant</li>
              <li>Live Code Editor</li>
              <li>Progress Tracking</li>
              <li>Certificates</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Connect</h4>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-lg bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-400">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-400">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-400">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800">
          <p>&copy; {new Date().getFullYear()} CodeLearn LMS. Built for educational excellence.</p>
        </div>
      </div>
    </footer>
  );
}
