"use client"

import type React from "react"

import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LandingPage() {
  const demoRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!demoRef.current) return

    const { left, top, width, height } = demoRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    setMousePosition({ x, y })
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Glowing Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
    `,
              backgroundSize: "40px 40px",
              backgroundPosition: "center center",
            }}
          ></div>

          {/* Animated grid overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="grid-dot absolute rounded-full bg-blue-500/20"
                style={{
                  width: Math.random() * 4 + 2 + "px",
                  height: Math.random() * 4 + 2 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 5 + "s",
                  animationDuration: Math.random() * 10 + 5 + "s",
                }}
              ></div>
            ))}
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,120,255,0.25)_0%,_rgba(0,0,0,0)_70%)] glow-effect"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">YTLearn</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-2 border-indigo-700/30 bg-black/50 backdrop-blur-sm text-indigo-400 hover:bg-indigo-900/20"
          >
            <Github className="h-4 w-4" />
            <span>Star on GitHub</span>
          </Button>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 border-0">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-800">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm">Proudly Open Source</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto text-glow">
          Follow any playlist like a paid course
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Transform YouTube playlists into structured courses with progress tracking, AI-generated assignments, quizzes,
          and documentation.
        </p>

        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-lg px-8 py-6 h-auto shadow-glow transition-all duration-300"
          >
            Get Started
          </Button>
        </Link>
      </main>

      {/* 3D Demo Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div
          ref={demoRef}
          className="bg-black/40 backdrop-blur-sm rounded-xl border border-indigo-900/30 p-6 md:p-8 max-w-5xl mx-auto shadow-glow transition-all duration-200 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
            boxShadow: `0 0 30px rgba(120, 120, 255, 0.3), 
                ${mousePosition.x * 20}px ${mousePosition.y * 20}px 60px rgba(120, 120, 255, 0.15)`,
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Complete Learning Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div className="bg-gray-900/80 rounded-lg border border-gray-800 overflow-hidden shadow-inner">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="font-medium">React TypeScript Tutorial</h3>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Progress: 42%</span>
                </div>

                <div className="divide-y divide-gray-800">
                  {/* Video Item */}
                  <div className="p-4 flex gap-4">
                    <div className="w-[120px] h-[68px] bg-gray-800 rounded flex-shrink-0 flex items-center justify-center">
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
                        className="text-red-500"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                        <path d="m10 15 5-3-5-3z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">1. TypeScript Setup with React</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">10:15</span>
                        <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                        <span className="text-xs text-green-400">Completed</span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <button className="text-xs text-blue-400 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                          Assignment
                        </button>
                        <button className="text-xs text-purple-400 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                          </svg>
                          Documentation
                        </button>
                        <button className="text-xs text-yellow-400 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a.671.671 0 0 1-.656.75.64.64 0 0 1-.344-.1"></path>
                            <path d="M19.8 17.817a2.5 2.5 0 0 0-2.5-2.5c-.644 0-1.35.21-2.3.6-1.8.744-2.063.356-2.5 0"></path>
                            <path d="M8.8 15.817c2 .744 2.731.356 3.3 0"></path>
                          </svg>
                          Quiz
                        </button>
                        <button className="text-xs text-green-400 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                            <path d="M9 9h1"></path>
                            <path d="M9 13h6"></path>
                            <path d="M9 17h6"></path>
                          </svg>
                          Notes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Documentation Section */}
                  <div className="p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-purple-400 flex items-center gap-1">
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
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                        Documentation & Resources:
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start p-2 rounded-md bg-gray-700/30">
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
                          className="mr-2 text-purple-400 mt-0.5"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                        <div className="flex-1">
                          <div className="font-medium text-sm">TypeScript Handbook: React Integration</div>
                          <div className="text-xs text-gray-400">typescriptlang.org</div>
                        </div>
                        <div className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Docs</div>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Section */}
                  <div className="p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-yellow-400 flex items-center gap-1">
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
                        >
                          <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a.671.671 0 0 1-.656.75.64.64 0 0 1-.344-.1"></path>
                          <path d="M19.8 17.817a2.5 2.5 0 0 0-2.5-2.5c-.644 0-1.35.21-2.3.6-1.8.744-2.063.356-2.5 0"></path>
                          <path d="M8.8 15.817c2 .744 2.731.356 3.3 0"></path>
                        </svg>
                        Quiz Challenge:
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <p className="font-medium mb-2">
                          What is the correct way to define a React component prop type in TypeScript?
                        </p>
                        <div className="space-y-1 ml-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full border border-gray-600 mr-2 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                            <span className="text-sm">interface Props &#123; name: string; &#125;</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full border border-gray-600 mr-2"></div>
                            <span className="text-sm">type Props = &#123; name: string; &#125;</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded">
                          Next Question
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-green-400 flex items-center gap-1">
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
                        >
                          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                          <path d="M9 9h1"></path>
                          <path d="M9 13h6"></path>
                          <path d="M9 17h6"></path>
                        </svg>
                        My Notes:
                      </h4>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-700 rounded-md p-3 text-sm">
                      <p>Remember to install TypeScript with: npm install typescript @types/react @types/react-dom</p>
                      <p className="mt-1">Key points:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300">
                        <li>Use interfaces for props and state</li>
                        <li>FC type is deprecated, use function components</li>
                        <li>Don't forget to type event handlers</li>
                      </ul>
                    </div>
                  </div>

                  {/* Assignment Section */}
                  <div className="p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-blue-400 flex items-center gap-1">
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
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        Assignment:
                      </h4>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>
                        Create a simple React component with TypeScript that accepts props for name, age, and a callback
                        function.
                      </li>
                      <li>Implement proper type definitions for all props and event handlers.</li>
                      <li>Add proper error handling for type mismatches.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-900/80 rounded-lg border border-gray-800 p-4 shadow-inner">
                <h3 className="font-medium mb-4">Your Progress</h3>

                <div className="flex justify-center mb-4">
                  <div className="relative inline-flex">
                    <svg className="w-24 h-24">
                      <circle cx="48" cy="48" r="36" fill="transparent" stroke="#374151" strokeWidth="8" />
                      <circle
                        cx="48"
                        cy="48"
                        r="36"
                        fill="transparent"
                        stroke="#3B82F6"
                        strokeWidth="8"
                        strokeDasharray="226.2"
                        strokeDashoffset="131.2"
                        strokeLinecap="round"
                        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">42%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Videos</span>
                    <span>3/7 completed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Assignments</span>
                    <span>2/7 completed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Quizzes</span>
                    <span>1/7 completed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Total Duration</span>
                    <span>1h 45m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">0</div>
            <div className="text-gray-400 text-sm">Total Solved</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">0</div>
            <div className="text-gray-400 text-sm">Easy</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">0</div>
            <div className="text-gray-400 text-sm">Medium</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">0</div>
            <div className="text-gray-400 text-sm">Hard</div>
          </div>
        </div>
      </section>

      {/* Twitter Reviews Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-glow mb-2">What People Are Saying 😊</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say about YTLearn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Tweet 1 */}
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@techguru" />
                  <AvatarFallback>TG</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Alex Chen</div>
                  <div className="text-sm text-gray-400">@techguru</div>
                </div>
              </div>
              <Twitter className="h-5 w-5 text-blue-400" />
            </div>
            <p className="mb-3">
              An aesthetic masterpiece! YTLearn transformed how I study programming tutorials. The AI-generated
              assignments and quizzes are incredibly helpful. 👌🔥
            </p>
            <div className="text-xs text-gray-500">6:44 PM · Apr 12, 2025</div>
            <div className="flex items-center gap-4 mt-3 text-gray-400">
              <div className="flex items-center gap-1">
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
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>12</span>
              </div>
              <div className="flex items-center gap-1">
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
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>3</span>
              </div>
            </div>
          </div>

          {/* Tweet 2 */}
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@codemaster" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Priya Sharma</div>
                  <div className="text-sm text-gray-400">@codemaster</div>
                </div>
              </div>
              <Twitter className="h-5 w-5 text-blue-400" />
            </div>
            <p className="mb-3">
              From watching random YouTube tutorials to structured learning with quizzes and documentation, we came a
              long way! YTLearn is a game changer for self-taught developers. 💯
            </p>
            <div className="text-xs text-gray-500">6:53 PM · Apr 10, 2025</div>
            <div className="flex items-center gap-4 mt-3 text-gray-400">
              <div className="flex items-center gap-1">
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
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>24</span>
              </div>
              <div className="flex items-center gap-1">
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
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>7</span>
              </div>
            </div>
          </div>

          {/* Tweet 3 */}
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@devninja" />
                  <AvatarFallback>DN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Harshit Khosla</div>
                  <div className="text-sm text-gray-400">@devninja</div>
                </div>
              </div>
              <Twitter className="h-5 w-5 text-blue-400" />
            </div>
            <p className="mb-3">
              Legend! 🙌 The quiz feature is amazing for testing your knowledge. YTLearn is exactly what I needed for my
              coding journey.
            </p>
            <div className="text-xs text-gray-500">1:43 PM · Apr 11, 2025</div>
            <div className="flex items-center gap-4 mt-3 text-gray-400">
              <div className="flex items-center gap-1">
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
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>36</span>
              </div>
              <div className="flex items-center gap-1">
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
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>14</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-indigo-700/30 bg-black/50 backdrop-blur-sm gap-2 text-indigo-400 hover:bg-indigo-900/20"
          >
            <Twitter className="h-4 w-4 text-blue-400" />
            <span>See more on Twitter</span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        <p>© 2025 YTLearn. All rights reserved.</p>
      </footer>
    </div>
  )
}
