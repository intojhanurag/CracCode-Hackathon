"use client"

import type React from "react"

import Link from "next/link"
import { Github, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import {useUser} from "@clerk/nextjs";
import TweetEmbed from "@/components/Tweet-embed"
import YouTubeHero from "@/components/Youtube-hero"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type DotStyle = {
  width: string;
  height: string;
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
};

export default function LandingPage() {

  const [dots,setDots]=useState<DotStyle[]>([]);
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


  useEffect(() => {
    const randomDots:DotStyle[] = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 4 + 2 + 'px',
      height: Math.random() * 4 + 2 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: Math.random() * 10 + 5 + 's',
    }));
    setDots(randomDots);
  }, []);
  
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
            {dots.map((dot,i) => (
              <div
                key={i}
                className="grid-dot absolute rounded-full bg-red-500/20"
                style={dot}
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
            <a
              href="https://x.com/Kaustubh_jain__/status/1918253266460393720"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/image3.png" alt="Tweet screenshot" className="rounded-lg w-full h-auto max-h-[600px] object-cover shadow-glow" />

            </a>
          </div>

          {/* Tweet 2 */}
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <a
                href="https://x.com/Paradoxical_xD/status/1918246195878564219"
                target="_blank"
                rel="noopener noreferrer"
              >
              <img src="/image0.png" alt="Tweet screenshot" className="rounded-lg w-full h-auto max-h-[600px] object-cover shadow-glow" />

            </a>
            
          </div>

          {/* Tweet 3 */}
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <a
              href="https://x.com/diwanshu_28/status/1918209912917901468"
              target="_blank"
              rel="noopener noreferrer"
            >
            <img src="/image2.png" alt="Tweet screenshot" className="rounded-lg w-full h-auto max-h-[800px] object-cover shadow-glow" />

           </a>
            
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <a
              href="https://x.com/DevNinjaShubham/status/1918357493744279826"
              target="_blank"
              rel="noopener noreferrer"
            >
            <img src="/image4.png" alt="Tweet screenshot" className="rounded-lg w-full h-auto max-h-[800px] object-cover shadow-glow" />

           </a>
            
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <a
              href="https://x.com/sambhavvoswal/status/1918216207586468260"
              target="_blank"
              rel="noopener noreferrer"
            >
            <img src="/image5.png" alt="Tweet screenshot" className="rounded-lg w-full h-auto max-h-[800px] object-cover shadow-glow" />

           </a>
            
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-4 shadow-glow">
            <a
              href="https://x.com/kathan_vakharia/status/1918299189882307041"
              target="_blank"
              rel="noopener noreferrer"
            >
            <img src="/image6.png" alt="Tweet screenshot" className="rounded-lg w-full h-auto max-h-[800px] object-cover shadow-glow" />

           </a>
            
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            
            className="border-indigo-700/30 bg-black/50 backdrop-blur-sm gap-2 text-indigo-400 hover:bg-indigo-900/20"
          >
            <Twitter className="h-4 w-4 text-blue-400" />
            <a href="https://x.com/AnuragOjha8355/status/1918195374335889569">
              <span>See more on Twitter</span>
            </a>      
          </Button>
        </div>
      </section>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        <p>© 2025 YTLearn. All rights reserved.</p>
      </footer>
    </div>
  )
}
