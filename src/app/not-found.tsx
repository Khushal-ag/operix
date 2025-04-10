"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-zinc-900 p-4">
      <div className="flex w-full max-w-4xl flex-col items-center space-y-10 text-center">
        {/* Glitch Effect 404 */}
        <div className="relative">
          <h1 className="text-[10rem] font-black tracking-tighter text-white md:text-[12rem]">
            4
            <span
              className={`inline-block text-orange-500 transition-transform duration-700 ${isAnimating ? "scale-110" : "scale-100"}`}
            >
              0
            </span>
            4
          </h1>

          {/* Decorative elements */}
          <div className="absolute -right-8 -top-6 size-24 rounded-full border-4 border-orange-500 opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 size-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 opacity-20"></div>

          {/* Circuit-like lines */}
          <div className="absolute -left-32 top-1/2 h-1 w-28 bg-orange-500/30"></div>
          <div className="absolute -right-32 top-1/2 h-1 w-28 bg-orange-500/30"></div>
          <div className="absolute -top-4 left-1/2 h-8 w-1 bg-orange-500/30"></div>
        </div>

        {/* Message */}
        <div className="max-w-lg space-y-6">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-orange-500">System Error</span> | Page Not
            Found
          </h2>

          <p className="text-gray-300">
            The page you&apos;re looking for seems to be missing from our
            system. Our engineers have been notified.
          </p>

          <div className="mx-auto h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-600"></div>

          <div className="group overflow-hidden rounded-lg border border-orange-900/30 bg-black/60 p-6 shadow-lg backdrop-blur-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
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
                  <path d="m18 16 4-4-4-4"></path>
                  <path d="m6 8-4 4 4 4"></path>
                  <path d="m14.5 4-5 16"></path>
                </svg>
                <span>Error Code: 404_PAGE_NOT_FOUND</span>
              </div>
              <p className="text-xs text-gray-500">
                Request failed at {new Date().toISOString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group w-full max-w-xs rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-4 font-bold text-black shadow-lg transition-all duration-200 ease-in-out hover:from-orange-600 hover:to-amber-700 hover:shadow-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M5 12h14"></path>
            </svg>
            <span>Return to Dashboard</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
