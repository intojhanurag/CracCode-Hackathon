"use client";

import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import Link from "next/link";

export default function YouTubeHero() {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-black py-20 md:py-32">
        {/* Red glow background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/30 to-black"></div>

        {/* Floating YouTube logo */}
        <div className="absolute top-10 right-10 floating-horizontal">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 p-3 shadow-lg">
            <Youtube className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-20 left-10 floating-horizontal">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/20 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>

        <div className="absolute top-32 left-10 floating-horizontal-delayed">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/20 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-40 right-20 floating-horizontal-reverse">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/20 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-800">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm">Version 1.0</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Follow any playlist like a <span className="text-red-500">paid course</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
              Transform YouTube playlists into structured courses with progress tracking, AI-generated assignments,
              quizzes, and documentation
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
                Get Started
              </Button>
              <Link href="#learn-more" className="text-white hover:text-red-300">
                What&apos;s more?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
