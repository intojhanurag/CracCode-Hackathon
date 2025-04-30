"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { VideoList } from "@/components/video-list"
import { PlaylistStats } from "@/components/playlist-stats"
import { RefreshCw, Edit, Trash2, Share2, BookOpen, Youtube } from "lucide-react"
import { fetchPlaylistDetails, type YouTubePlaylist } from "@/lib/youtube-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Users } from "lucide-react"

export function PlaylistDashboard() {
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [currentPlaylist, setCurrentPlaylist] = useState<YouTubePlaylist | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playlistUrl) return

    setIsLoading(true)
    setError(null)

    try {
      // Extract playlist ID from URL
      const playlistId = extractPlaylistId(playlistUrl)

      if (!playlistId) {
        throw new Error("Invalid YouTube playlist URL")
      }

      // Fetch playlist details
      const playlist = await fetchPlaylistDetails(playlistId)
      setCurrentPlaylist(playlist)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load playlist")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCurrentPlaylist(null)
    setPlaylistUrl("")
  }

  function extractPlaylistId(url: string): string | null {
    try {
      const urlObj = new URL(url)

      // Handle different YouTube URL formats
      if (urlObj.hostname.includes("youtube.com")) {
        // Format: https://www.youtube.com/playlist?list=PLAYLIST_ID
        const playlistId = urlObj.searchParams.get("list")
        if (playlistId) return playlistId
      }

      // If it's already just an ID
      if (/^[A-Za-z0-9_-]{10,}$/.test(url)) {
        return url
      }

      return null
    } catch (error) {
      return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!currentPlaylist ? (
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Transform YouTube into Your Learning Platform</h1>
              <p className="text-white/80">
                Import any YouTube playlist and turn it into an interactive course with progress tracking and
                AI-generated assignments
              </p>
            </div>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="playlist-url" className="text-sm font-medium">
                    Enter YouTube Playlist URL
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                      <Input
                        id="playlist-url"
                        placeholder="https://www.youtube.com/playlist?list=..."
                        value={playlistUrl}
                        onChange={(e) => setPlaylistUrl(e.target.value)}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Import Playlist"
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-1">AI-Generated Assignments</h3>
                    <p className="text-sm text-gray-400">Practice with custom assignments for each video</p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                      <RefreshCw className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="font-medium mb-1">Progress Tracking</h3>
                    <p className="text-sm text-gray-400">Track your progress through any YouTube playlist</p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                      <Share2 className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="font-medium mb-1">Share Your Progress</h3>
                    <p className="text-sm text-gray-400">Share your learning journey with others</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      <span>1,234 active users</span>
                    </Badge>
                  </div>
                  <Link href="https://github.com/intojhanurag/CracCode-Hackathon">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" />
                      <span>Star on GitHub</span>
                    </Button>
                  </Link>
                  
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {currentPlaylist.thumbnailUrl && (
                <Image
                  src={currentPlaylist.thumbnailUrl || "/placeholder.svg"}
                  alt={currentPlaylist.title}
                  width={80}
                  height={45}
                  className="rounded-md object-cover hidden md:block"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold">{currentPlaylist.title}</h1>
                <p className="text-sm text-gray-400">
                  By {currentPlaylist.channelTitle} • {currentPlaylist.totalVideos} • {currentPlaylist.totalDuration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              <Button variant="destructive" size="sm" className="gap-1" onClick={handleReset}>
                <Trash2 className="h-4 w-4" />
                <span className="hidden md:inline">Remove</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <VideoList playlist={currentPlaylist} />
                </div>
                <div className="space-y-6">
                  <PlaylistStats playlist={currentPlaylist} />

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Community Stats</h3>
                        <Badge variant="outline">Live</Badge>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Active Learners</span>
                          <span className="font-medium">243</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Completion Rate</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Avg. Completion Time</span>
                          <span className="font-medium">14 days</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-4 text-sm">
                        View Community
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3">Your Profile</h3>

                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-user.jpg" alt="User" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-gray-400">Joined April 2023</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Courses Started</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Courses Completed</span>
                          <span className="font-medium">8</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Total Learning Time</span>
                          <span className="font-medium">43h 12m</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-4 text-sm">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">My Course Notes</h2>
                <p className="text-gray-400 mb-6">
                  Take notes as you progress through the course to help reinforce your learning.
                </p>

                <div className="min-h-[300px] bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-center py-10">
                    Your notes will appear here as you add them to videos.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="assignments">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">My Assignments</h2>
                <p className="text-gray-400 mb-6">Track your progress on assignments for each video in the course.</p>

                <div className="min-h-[300px] bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-center py-10">
                    Complete assignments from the video list to see them here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
