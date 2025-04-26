"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CircularProgress } from "@/components/ui/circular-progress"
import { YoutubeIcon, ChevronDown, BookOpen, ExternalLink } from "lucide-react"
import { DocumentationSection } from "@/components/documentation-section"
import { QuizSection } from "@/components/quiz-section"
import { NotesSection } from "@/components/notes-section"
import { useGroq } from "@/hooks/use-groq"
import Image from "next/image"

interface Video {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  thumbnailUrl?: string
  progress?: number
}

interface PlaylistProps {
  playlist: {
    videos: Video[]
  }
}

export function VideoList({ playlist }: PlaylistProps) {
  const [videos, setVideos] = useState(playlist.videos)
  const [openAssignments, setOpenAssignments] = useState<Record<string, boolean>>({})
  const [assignments, setAssignments] = useState<Record<string, string[]>>({})
  const [documentationResources, setDocumentationResources] = useState<Record<string, any[]>>({})
  const [quizQuestions, setQuizQuestions] = useState<Record<string, any[]>>({})

  const { generateAssignment, getDocumentationResources, generateQuiz, isGenerating, isLoadingDocs, isGeneratingQuiz } =
    useGroq()

  const toggleVideoCompletion = (videoId: string) => {
    setVideos(videos.map((video) => (video.id === videoId ? { ...video, completed: !video.completed } : video)))
  }

  const toggleAssignment = async (videoId: string) => {
    const newState = !openAssignments[videoId]
    setOpenAssignments({
      ...openAssignments,
      [videoId]: newState,
    })

    // If opening and no assignment exists yet, generate one
    if (newState && !assignments[videoId]) {
      const video = videos.find((v) => v.id === videoId)
      if (video) {
        const questions = await generateAssignment(video.title, video.description)
        setAssignments({
          ...assignments,
          [videoId]: questions,
        })
      }
    }
  }

  // Load documentation resources when a video is first rendered
  useEffect(() => {
    const loadDocumentation = async () => {
      try {
        for (const video of videos) {
          if (!documentationResources[video.id]) {
            try {
              const resources = await getDocumentationResources(video.title, video.description)
              setDocumentationResources((prev) => ({
                ...prev,
                [video.id]: resources,
              }))
            } catch (err) {
              console.error(`Error loading documentation for video ${video.id}:`, err)
              // Set empty array as fallback
              setDocumentationResources((prev) => ({
                ...prev,
                [video.id]: [],
              }))
            }
          }
        }
      } catch (err) {
        console.error("Error in loadDocumentation:", err)
      }
    }

    loadDocumentation()

    // Also load quiz questions for each video
    const loadQuizQuestions = async () => {
      try {
        for (const video of videos) {
          if (!quizQuestions[video.id]) {
            try {
              const questions = await generateQuiz(video.title, video.description)
              setQuizQuestions((prev) => ({
                ...prev,
                [video.id]: questions,
              }))
            } catch (err) {
              console.error(`Error loading quiz for video ${video.id}:`, err)
              // Set empty array as fallback
              setQuizQuestions((prev) => ({
                ...prev,
                [video.id]: [],
              }))
            }
          }
        }
      } catch (err) {
        console.error("Error in loadQuizQuestions:", err)
      }
    }

    loadQuizQuestions()
  }, [videos, getDocumentationResources, generateQuiz, documentationResources, quizQuestions])

  const handleWatchVideo = (videoId: string) => {
    // In a real app, this would redirect to the YouTube video
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gray-800/50">
        <h2 className="text-lg font-semibold">Course Content</h2>
        <p className="text-sm text-gray-400">Complete all videos and assignments to finish the course</p>
      </div>

      <div className="divide-y divide-gray-800">
        {videos.map((video, index) => (
          <div key={video.id} className={`p-4 ${video.completed ? "bg-gray-800/30" : ""}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 relative">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl || "/placeholder.svg"}
                    alt={video.title}
                    width={120}
                    height={68}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-[120px] h-[68px] bg-gray-800 rounded-md flex items-center justify-center">
                    <YoutubeIcon className="h-8 w-8 text-red-500" />
                  </div>
                )}
                <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">{video.duration}</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium line-clamp-2">
                      {index + 1}. {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Checkbox
                        checked={video.completed}
                        onCheckedChange={() => toggleVideoCompletion(video.id)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                      />
                      <span className="text-xs text-gray-400">
                        {video.completed ? "Completed" : "Mark as completed"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {typeof video.progress === "number" && (
                      <CircularProgress
                        value={video.progress}
                        size={36}
                        strokeWidth={4}
                        showValue={false}
                        color={video.completed ? "stroke-green-500" : "stroke-blue-500"}
                      />
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 gap-1 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 text-blue-400"
                      onClick={() => handleWatchVideo(video.id)}
                    >
                      <YoutubeIcon className="h-4 w-4 text-red-500" />
                      <span>Watch</span>
                    </Button>
                  </div>
                </div>

                {/* Notes Section */}
                <NotesSection videoId={video.id} videoTitle={video.title} />

                {/* Documentation Section */}
                <DocumentationSection
                  videoId={video.id}
                  videoTitle={video.title}
                  resources={documentationResources[video.id] || []}
                  isLoading={isLoadingDocs && !documentationResources[video.id]}
                />

                {/* Quiz Section */}
                <QuizSection
                  videoId={video.id}
                  videoTitle={video.title}
                  questions={quizQuestions[video.id] || []}
                  isLoading={isGeneratingQuiz && !quizQuestions[video.id]}
                />

                {/* Assignment Section */}
                <Collapsible open={openAssignments[video.id]} onOpenChange={() => toggleAssignment(video.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-blue-400 mt-2">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Assignment
                      <ChevronDown
                        className={`h-3 w-3 ml-1 transition-transform ${openAssignments[video.id] ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 p-4 bg-gray-800/50 rounded-md text-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Practice Questions:</h4>
                      <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                        <ExternalLink className="h-3 w-3" />
                        <span>Open in new tab</span>
                      </Button>
                    </div>
                    {isGenerating && !assignments[video.id] ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                        <span className="ml-2 text-sm text-gray-400">Generating assignment...</span>
                      </div>
                    ) : (
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        {(
                          assignments[video.id] || [
                            "Explain the key concepts covered in this video.",
                            "Implement a simple example using the techniques shown.",
                            "What challenges might you face when applying this in a real project?",
                            "How would you extend the functionality shown in the video?",
                            "Compare this approach with alternative methods you've used before.",
                          ]
                        ).map((question, i) => (
                          <li key={i}>{question}</li>
                        ))}
                      </ol>
                    )}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        <em>Generated by AI based on video content</em>
                      </p>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Submit Answer
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
