"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YoutubeIcon, PlusCircle, BookOpen, Clock } from "lucide-react"
import { Header } from "@/components/header"
// import DashboardHeader from "@/components/dashboard-header"
// import AddPlaylistForm from "@/components/add-playlist-form"
import { Input } from "@/components/ui/input"

export default function CoursePage() {
  const [userPlaylists, setUserPlaylists] = useState<any[]>([])

  // Load user playlists from localStorage
  useEffect(() => {
    const storedPlaylists = localStorage.getItem("userPlaylists");
    if (storedPlaylists) {
      try {
        const parsedPlaylists = JSON.parse(storedPlaylists);
  
        // Validate that the parsed data is an array
        if (Array.isArray(parsedPlaylists)) {
          setUserPlaylists(parsedPlaylists);
        } else {
          console.warn("Invalid data in localStorage, resetting to an empty array.");
          setUserPlaylists([]);
        }
      } catch (e) {
        console.error("Error parsing stored playlists:", e);
        setUserPlaylists([]); // Reset to an empty array on error
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      
        <Header/>
        <Tabs defaultValue="courses">
          

          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show stored playlists first */}
              {userPlaylists.map((playlist, i) => (
                <Card key={`user-${i}`} className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <div className="relative h-40 mb-2 bg-gray-800 rounded-md overflow-hidden">
                      {playlist.thumbnailUrl ? (
                        <img
                          src={playlist.thumbnailUrl || "/placeholder.svg"}
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <YoutubeIcon className="h-12 w-12 text-red-600" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{playlist.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      By {playlist.channelTitle} • {playlist.videoCount} videos • {playlist.totalDuration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium">0%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="bg-red-600 h-full" style={{ width: "0%" }}></div>
                    </div>
                    <div className="mt-4">
                      <Button variant="default" className="w-full bg-gray-800 hover:bg-gray-700">
                        <Link href={`/course/${playlist.id}`}>Continue Learning</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Show demo courses if no user playlists */}
              {userPlaylists.length === 0 &&
                [1, 2, 3].map((i) => (
                  <Card key={i} className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <div className="relative h-40 mb-2 bg-gray-800 rounded-md overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <YoutubeIcon className="h-12 w-12 text-red-600" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">Operating System (Complete Playlist)</CardTitle>
                      <CardDescription className="text-gray-400">
                        By Gate Smashers • 50 videos • 12h 13m
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm font-medium">0%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="bg-red-600 h-full" style={{ width: "0%" }}></div>
                      </div>
                      <div className="mt-4">
                        <Button variant="default" className="w-full bg-gray-800 hover:bg-gray-700">
                          <Link href="/course/1">Continue Learning</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5 text-red-600" />
                        <span className="text-sm text-gray-400">Total Courses</span>
                      </div>
                      <p className="text-2xl font-bold">{userPlaylists.length || 3}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-red-600" />
                        <span className="text-sm text-gray-400">Total Hours</span>
                      </div>
                      <p className="text-2xl font-bold">36h 45m</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center">
                        <YoutubeIcon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Operating System - Lecture 1</p>
                        <p className="text-sm text-gray-400">Watched 15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center">
                        <YoutubeIcon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Data Structures - Lecture 5</p>
                        <p className="text-sm text-gray-400">Watched 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  )
}
