"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Share2, Trash2, BookOpen, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import VideoPlayer from "@/components/video-player"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { formatTime } from "@/lib/youtube-api"


import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CoursePage({ params }: { params: { id: string } }) {
  const [activeVideo, setActiveVideo] = useState(0)
  const [notes, setNotes] = useState<Record<number, string>>({})
  const [progress, setProgress] = useState(0)
  const [courseData, setCourseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [videoProgress, setVideoProgress] = useLocalStorage<Record<string, number>>(
    `course_${params.id}_video_progress`,
    {},
  )
  const [completedVideos, setCompletedVideos] = useLocalStorage<Record<string, boolean>>(
    `course_${params.id}_completed_videos`,
    {},
  )
  const router = useRouter()

  // Load course data from localStorage or API
  useEffect(() => {
    // First try to load from localStorage
    const userPlaylists = JSON.parse(localStorage.getItem("userPlaylists") || "[]")
    const playlist = userPlaylists.find((p: any) => p.id === params.id)

    if (playlist) {
      // Update completed status based on localStorage
      if (playlist.videos) {
        playlist.videos = playlist.videos.map((video: any) => {
          return {
            ...video,
            completed: completedVideos[video.videoId] || false,
          }
        })
      }

      setCourseData(playlist)
      setLoading(false)
    } else {
      // If not in localStorage, try to fetch from API
      // This is a fallback for demo purposes
      setTimeout(() => {
        const demoData = {
          id: params.id,
          title: "Operating System (Complete Playlist)",
          channelTitle: "Gate Smashers",
          videoCount: 50,
          totalDuration: "12h 13m",
          videos: [
            {
              id: "video1",
              videoId: "bkSWJJZNgf8", // Real YouTube video ID
              title:
                "Lec-0:Operating System Syllabus Discussion for all College/University & Competitive exams (GATE,NET)",
              duration: "13:01",
              completed: completedVideos["bkSWJJZNgf8"] || false,
              description: "This lecture covers the syllabus of Operating Systems for various competitive exams.",
              chapters: [
                { title: "Introduction", startTime: 0 },
                { title: "Syllabus Overview", startTime: 120 },
                { title: "Exam Pattern", startTime: 300 },
                { title: "Study Resources", startTime: 480 },
              ],
            },
            {
              id: "video2",
              videoId: "F18-19oK7Ug", // Real YouTube video ID
              title: "L-1.1: Introduction to Operating System and its Functions with English Subtitles",
              duration: "18:59",
              completed: completedVideos["F18-19oK7Ug"] || false,
              description: "This lecture introduces the concept of Operating Systems and their key functions.",
              chapters: [
                { title: "What is an OS?", startTime: 0 },
                { title: "Functions of OS", startTime: 180 },
                { title: "OS Architecture", startTime: 420 },
                { title: "Key Concepts", startTime: 720 },
              ],
            },
            // More videos would be here
          ],
        }
        setCourseData(demoData)
        setLoading(false)
      }, 1000)
    }
  }, [params.id, completedVideos])

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`course_${params.id}_notes`)
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [params.id])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`course_${params.id}_notes`, JSON.stringify(notes))
  }, [notes, params.id])

  // Calculate overall progress whenever video progress changes or course data updates
  useEffect(() => {
    if (courseData && courseData.videos) {
      updateCourseProgress()
    }
  }, [videoProgress, completedVideos, courseData])

  // Function to update course progress and save to localStorage
  const updateCourseProgress = () => {
    if (!courseData || !courseData.videos) return

    // Count completed videos
    const completedCount = courseData.videos.filter((video: any) => completedVideos[video.videoId] || false).length

    // Calculate percentage
    const overallProgress = Math.floor((completedCount / courseData.videos.length) * 100)
    setProgress(overallProgress)

    // Update course data with completed status
    const updatedCourseData = { ...courseData }
    updatedCourseData.videos = courseData.videos.map((video: any) => {
      return {
        ...video,
        completed: completedVideos[video.videoId] || false,
      }
    })

    // Update course data state
    setCourseData(updatedCourseData)

    // Save updated completion status to localStorage
    const userPlaylists = JSON.parse(localStorage.getItem("userPlaylists") || "[]")
    const playlistIndex = userPlaylists.findIndex((p: any) => p.id === params.id)

    if (playlistIndex !== -1) {
      userPlaylists[playlistIndex] = updatedCourseData
      localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists))
    }
  }

  // Track video progress
  const handleVideoProgress = (videoIndex: number, currentTime: number, duration: number) => {
    if (!courseData || !courseData.videos[videoIndex]) return

    const videoId = courseData.videos[videoIndex].videoId

    // Only update if the current time is greater than what we have stored
    // This prevents overwriting progress when rewatching earlier parts
    if (currentTime > (videoProgress[videoId] || 0)) {
      const newProgress = {
        ...videoProgress,
        [videoId]: currentTime,
      }
      setVideoProgress(newProgress)

      // Check if video should be marked as completed (over 90% watched)
      const videoDuration = duration
      if (videoDuration > 0 && currentTime / videoDuration > 0.9 && !completedVideos[videoId]) {
        markVideoAsCompleted(videoIndex)
      }
    }
  }

  const markVideoAsCompleted = (videoIndex: number) => {
    if (!courseData || !courseData.videos[videoIndex]) return

    const videoId = courseData.videos[videoIndex].videoId

    // Only update if not already completed
    if (!completedVideos[videoId]) {
      console.log(`Marking video ${videoId} as completed`)

      // Update completed videos in localStorage
      const newCompletedVideos = {
        ...completedVideos,
        [videoId]: true,
      }
      setCompletedVideos(newCompletedVideos)
    }
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes({
      ...notes,
      [activeVideo]: e.target.value,
    })
  }

  const handleVideoEnd = () => {
    console.log("Video ended, marking as completed")

    // Mark current video as completed
    if (courseData && courseData.videos[activeVideo]) {
      markVideoAsCompleted(activeVideo)

      // Auto-advance to next video if available
      if (activeVideo < courseData.videos.length - 1) {
        setTimeout(() => {
          setActiveVideo(activeVideo + 1)
        }, 1000) // Small delay before advancing
      }
    }
  }

  const handleRemoveCourse = () => {
    // Remove course from localStorage
    const userPlaylists = JSON.parse(localStorage.getItem("userPlaylists") || "[]")
    const updatedPlaylists = userPlaylists.filter((p: any) => p.id !== params.id)
    localStorage.setItem("userPlaylists", JSON.stringify(updatedPlaylists))

    // Remove course-specific data
    localStorage.removeItem(`course_${params.id}_notes`)
    localStorage.removeItem(`course_${params.id}_video_progress`)
    localStorage.removeItem(`course_${params.id}_completed_videos`)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  // Helper function to convert duration string (MM:SS) to seconds
  const convertDurationToSeconds = (duration: string): number => {
    if (!duration) return 0

    const parts = duration.split(":").map(Number)
    if (parts.length === 3) {
      // HH:MM:SS
      return parts[0] * 3600 + parts[1] * 60 + parts[2]
    } else if (parts.length === 2) {
      // MM:SS
      return parts[0] * 60 + parts[1]
    }
    return 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{courseData.title}</h1>
            <p className="text-gray-400">
              By {courseData.channelTitle} • {courseData.videoCount} videos • {courseData.totalDuration}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-white">
              <Link href={`/roadmap/${params.id}`} className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" /> Create Roadmap
              </Link>
            </Button>
            <Button variant="outline" className="border-gray-700 text-white">
              <Share2 className="mr-2 h-4 w-4" /> Share Your Progress
            </Button>
            <Button variant="destructive" onClick={handleRemoveCourse}>
              <Trash2 className="mr-2 h-4 w-4" /> Remove
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Video player and tabs - takes up 8/12 columns on large screens */}
          <div className="lg:col-span-8">
            {courseData.videos[activeVideo] && (
              <VideoPlayer
                key={courseData.videos[activeVideo].videoId} // Add key to force re-render when video changes
                videoId={courseData.videos[activeVideo].videoId}
                onProgress={(currentTime, duration) => handleVideoProgress(activeVideo, currentTime, duration)}
                onVideoEnd={handleVideoEnd}
                chapters={courseData.videos[activeVideo].chapters}
                initialTime={videoProgress[courseData.videos[activeVideo].videoId] || 0}
              />
            )}

            <Tabs defaultValue="videos" className="mt-6">
              <TabsList className="bg-gray-900 border-b border-gray-800">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="notes">My Notes</TabsTrigger>
                
                <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
                <TabsTrigger value="summary">Course Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="pt-4 lg:hidden">
                {/* Mobile-only video list - hidden on large screens */}
                <h2 className="text-xl font-bold mb-4">Course Content</h2>
                <p className="text-gray-400 mb-6">Complete all videos to finish the course</p>

                <div className="space-y-4">
                  {courseData.videos.map((video: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer ${
                        activeVideo === index ? "bg-gray-800" : "hover:bg-gray-900"
                      }`}
                      onClick={() => setActiveVideo(index)}
                    >
                      <div className="relative">
                        <div className="w-32 h-20 bg-gray-800 rounded flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 px-1 rounded text-xs">
                          {video.duration}
                        </div>

                        {/* Progress indicator */}
                        {videoProgress[video.videoId] > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                            <div
                              className="h-full bg-red-600"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (videoProgress[video.videoId] / convertDurationToSeconds(video.duration)) * 100,
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {index + 1}. {video.title}
                        </h3>
                        <div className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            id={`video-${index}`}
                            checked={completedVideos[video.videoId] || false}
                            className="mr-2"
                            onChange={() => {
                              const videoId = video.videoId
                              const newCompletedVideos = {
                                ...completedVideos,
                                [videoId]: !completedVideos[videoId],
                              }
                              setCompletedVideos(newCompletedVideos)
                            }}
                          />
                          <label htmlFor={`video-${index}`} className="text-sm text-gray-400">
                            Mark as completed
                          </label>

                          {videoProgress[video.videoId] > 0 && !completedVideos[video.videoId] && (
                            <span className="ml-auto text-xs text-gray-400">
                              {formatTime(videoProgress[video.videoId])} / {video.duration}
                            </span>
                          )}

                          {completedVideos[video.videoId] && (
                            <span className="ml-auto text-xs text-green-500">Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="pt-4">
                <h2 className="text-xl font-bold mb-4">My Notes</h2>
                <p className="text-gray-400 mb-6">Take notes for the current video. Notes are saved automatically.</p>

                <Textarea
                  placeholder="Write your notes here..."
                  className="min-h-[300px] bg-gray-900 border-gray-700 text-white"
                  value={notes[activeVideo] || ""}
                  onChange={handleNoteChange}
                />
              </TabsContent>

            </Tabs>
          </div>

          {/* Sidebar - takes up 4/12 columns on large screens */}
          <div className="lg:col-span-4">
            {/* Progress card */}
            <div className="bg-gray-900 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4">Your Progress</h2>

              <div className="relative h-40 w-40 mx-auto mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-bold">{progress}%</div>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="10"
                    strokeDasharray={`${(2 * Math.PI * 40 * progress) / 100} ${
                      2 * Math.PI * 40 * (1 - progress / 100)
                    }`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-gray-400">
                  {Math.floor((Object.values(completedVideos).filter(Boolean).length / courseData.videos.length) * 100)}
                  % of {courseData.videoCount} videos completed
                </p>
              </div>
            </div>

            {/* Video list - visible only on large screens */}
            <div className="bg-gray-900 p-6 rounded-lg mb-6 hidden lg:block">
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              <div className="max-h-[600px] overflow-y-auto pr-2">
                {courseData.videos.map((video: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      activeVideo === index ? "bg-gray-800" : "hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveVideo(index)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {completedVideos[video.videoId] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-gray-600 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{video.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{video.duration}</span>
                        {videoProgress[video.videoId] > 0 && !completedVideos[video.videoId] && (
                          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-600"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (videoProgress[video.videoId] / convertDurationToSeconds(video.duration)) * 100,
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current video info */}
            <div className="bg-gray-900 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4">Current Video</h2>
              <h3 className="font-medium text-sm mb-2">{courseData.videos[activeVideo].title}</h3>

              {courseData.videos[activeVideo].chapters && courseData.videos[activeVideo].chapters.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Video Chapters</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {courseData.videos[activeVideo].chapters.map((chapter: any, idx: number) => (
                      <li key={idx} className="flex justify-between">
                        <span>{chapter.title}</span>
                        <span>{formatTime(chapter.startTime)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Course info */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Total Videos</h3>
                  <p>{courseData.videoCount} lessons</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Total Duration</h3>
                  <p>{courseData.totalDuration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Channel</h3>
                  <p>{courseData.channelTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
