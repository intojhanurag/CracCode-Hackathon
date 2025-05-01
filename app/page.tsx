"use client"

import type React from "react"

import Link from "next/link"
import { Github, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import {useUser} from "@clerk/nextjs";
import YouTubeHero from "@/components/Youtube-hero"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LandingPage() {
  const {user}=useUser();
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

  const avatarSrc = "/profile.webp";

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
                className="grid-dot absolute rounded-full bg-red-500/20"
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.25)_0%,_rgba(0,0,0,0)_70%)] glow-effect"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Youtube className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold">YTLearn</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/intojhanurag/CracCode-Hackathon">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-2 border-red-700/30 bg-black/50 backdrop-blur-sm text-red-400 hover:bg-indigo-900/20"
            >
              <Github className="h-4 w-4" />
              <span>Star on GitHub</span>
            </Button>
          </Link>
          {/* Show Profile Icon if Logged In, Otherwise Show Login Button */}
          {user ? (
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={avatarSrc} alt="User" />
                  <AvatarFallback>{user.firstName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-red-600 via-red-600 to-red-600 hover:from-red-700 hover:via-red-700 hover:to-red-700 border-0">
                Login
              </Button>
            </Link>
          )}
        </div>
      </header>
      <YouTubeHero/>
      
      {/* 3D Demo Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div
          ref={demoRef}
          className="bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 p-6 md:p-8 max-w-5xl mx-auto shadow-glow transition-all duration-200 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
            boxShadow: `0 0 30px rgba(255, 0, 0, 0.3),  
                ${mousePosition.x * 20}px ${mousePosition.y * 20}px 60px rgba(120, 120, 255, 0.15)`,
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Complete Learning Experience</h2>
          <img
            src="/demo.png"
            alt="Demo"
            className="w-full h-auto object-contain max-h-[80vh]"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2 break-words">Notes</div>
            <div className="text-gray-400 text-sm">Write down important points in the notes section for each video.</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-500 mb-2 break-words">Docs</div>
            <div className="text-gray-400 text-sm">After watching the video, read the related documentation to fill any gaps.</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2 break-words">Quizzes</div>
            <div className="text-gray-400 text-sm">Test your understanding after finishing each video.</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2 break-words">Exercise</div>
            <div className="text-gray-400 text-sm">Practice more by attempting the assignment for each video.</div>
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
