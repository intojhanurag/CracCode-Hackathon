"use client"

import { useState } from "react"
import { generateAssignment } from "@/lib/gemini-service"
import { fetchDocumentationResources } from "@/lib/youtube-service"
import { generateQuiz } from "@/lib/quiz-service"

export function useGemini() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoadingDocs, setIsLoadingDocs] = useState(false)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateVideoAssignment = async (videoTitle: string, videoDescription: string) => {
    setIsGenerating(true)
    setError(null)

    try {
      const questions = await generateAssignment(videoTitle, videoDescription)
      return questions
    } catch (err) {
      setError("Failed to generate assignment. Please try again.")
      console.error(err)
      return []
    } finally {
      setIsGenerating(false)
    }
  }

  const getDocumentationResources = async (videoTitle: string, videoDescription: string) => {
    setIsLoadingDocs(true)
    setError(null)

    try {
      const resources = await fetchDocumentationResources(videoTitle, videoDescription)
      return resources
    } catch (err) {
      setError("Failed to fetch documentation resources. Please try again.")
      console.error(err)
      return []
    } finally {
      setIsLoadingDocs(false)
    }
  }

  const generateVideoQuiz = async (videoTitle: string, videoDescription: string) => {
    setIsGeneratingQuiz(true)
    setError(null)

    try {
      const quiz = await generateQuiz(videoTitle, videoDescription)
      return quiz
    } catch (err) {
      setError("Failed to generate quiz. Please try again.")
      console.error(err)
      return []
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  return {
    generateAssignment: generateVideoAssignment,
    getDocumentationResources,
    generateQuiz: generateVideoQuiz,
    isGenerating,
    isLoadingDocs,
    isGeneratingQuiz,
    error,
  }
}
