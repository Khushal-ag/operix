import React from "react";
import Link from "next/link";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-zinc-900 p-4">
      <div className="flex w-full max-w-4xl flex-col items-center space-y-8 text-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 p-5 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
              <polyline points="7.5 19.79 7.5 14.6 3 12" />
              <polyline points="21 12 16.5 14.6 16.5 19.79" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tighter md:text-6xl">
              <span className="text-white dark:text-white">Oper</span>
              <span className="text-orange-500 dark:text-orange-400">ix</span>
            </h1>
            <p className="max-w-2xl text-xl font-medium text-gray-300 dark:text-gray-300">
              Professional Admin Dashboard & Management System
            </p>
          </div>
          <div className="flex items-center space-x-2 border-y border-gray-700 px-4 py-2 text-sm text-gray-400 dark:border-gray-700 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
            >
              <path d="M20 7h-9" />
              <path d="M14 17H5" />
              <circle cx="17" cy="17" r="3" />
              <circle cx="7" cy="7" r="3" />
            </svg>
            <span>Built with Next.js + tRPC + Tailwind</span>
          </div>
        </div>

        {/* Features */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group overflow-hidden rounded-lg border border-orange-900/30 bg-black/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-600"></div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-md group-hover:shadow-orange-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-orange-400">
                Next.js
              </h2>
              <p className="text-center text-sm text-gray-300">
                Built with Next.js for lightning-fast performance and SEO
                optimization
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg border border-orange-900/30 bg-black/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-600"></div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-md group-hover:shadow-orange-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-orange-400">
                tRPC
              </h2>
              <p className="text-center text-sm text-gray-300">
                End-to-end typesafe APIs with tRPC for reliable data
                communication
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg border border-orange-900/30 bg-black/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-600"></div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-md group-hover:shadow-orange-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-orange-400">
                Tailwind CSS
              </h2>
              <p className="text-center text-sm text-gray-300">
                Styled with Tailwind CSS for a modern and responsive design
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="w-full max-w-md pt-8">
          <Link
            href="/admin"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-4 font-bold text-black shadow-lg transition-all duration-200 ease-in-out hover:from-orange-600 hover:to-amber-700 hover:shadow-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Enter Admin Panel
          </Link>
          <p className="mt-8 text-sm text-gray-400">
            Secure, scalable, and easy to use.
          </p>
        </div>

        {/* Footer */}
        <div className="pb-6 pt-10">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Built with <span className="text-orange-500">♥</span> using modern
            web technologies
          </p>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
