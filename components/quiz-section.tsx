"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle2, XCircle, ChevronDown, Award, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { type QuizQuestion, evaluateQuizAnswers } from "@/lib/quiz-service"

interface QuizSectionProps {
  videoId: string
  videoTitle: string
  questions: QuizQuestion[]
  isLoading?: boolean
}

export function QuizSection({ videoId, videoTitle, questions, isLoading = false }: QuizSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizResults, setQuizResults] = useState<{
    score: number
    totalQuestions: number
    correctCount: number
    feedback: Record<string, { correct: boolean; explanation: string }>
  } | null>(null)
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({})

  // Reset quiz state when questions change
  useEffect(() => {
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizSubmitted(false)
    setQuizResults(null)
    setShowExplanation({})
  }, [questions])

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    // Create a map of question IDs to correct answers
    const correctAnswers: Record<string, string> = {}
    questions.forEach((q) => {
      correctAnswers[q.id] = q.correctAnswer
    })

    // Evaluate the quiz
    const results = await evaluateQuizAnswers(userAnswers, correctAnswers)
    setQuizResults(results)
    setQuizSubmitted(true)
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizSubmitted(false)
    setQuizResults(null)
    setShowExplanation({})
  }

  const toggleExplanation = (questionId: string) => {
    setShowExplanation((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-500">Excellent</Badge>
    if (score >= 70) return <Badge className="bg-blue-500">Good</Badge>
    if (score >= 50) return <Badge className="bg-yellow-500">Fair</Badge>
    return <Badge className="bg-red-500">Needs Improvement</Badge>
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-yellow-400">
          <Award className="h-3 w-3 mr-1" />
          Quiz Challenge
          <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Quiz: {videoTitle}</span>
              {!quizSubmitted && (
                <Badge variant="outline" className="text-xs">
                  {currentQuestionIndex + 1} of {questions.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-8 w-8 border-2 border-yellow-500 rounded-full border-t-transparent"></div>
                <span className="ml-3 text-gray-400">Generating challenging quiz questions...</span>
              </div>
            ) : quizSubmitted && quizResults ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="text-4xl font-bold mb-2">{quizResults.score}%</div>
                  <div className="flex justify-center mb-2">{getScoreBadge(quizResults.score)}</div>
                  <p className="text-gray-400">
                    You got {quizResults.correctCount} out of {quizResults.totalQuestions} questions correct
                  </p>
                </div>

                <Progress value={quizResults.score} className="h-2" />

                <div className="space-y-4 mt-6">
                  <h3 className="font-medium">Review Your Answers:</h3>
                  {questions.map((question, index) => {
                    const feedback = quizResults.feedback[question.id]
                    return (
                      <div key={question.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          {feedback?.correct ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">
                              {index + 1}. {question.question}
                            </p>
                            <div className="mt-2 text-sm">
                              <p>
                                Your answer:{" "}
                                <span className={feedback?.correct ? "text-green-400" : "text-red-400"}>
                                  {userAnswers[question.id] || "Not answered"}
                                </span>
                              </p>
                              {!feedback?.correct && (
                                <p className="text-green-400">Correct answer: {question.correctAnswer}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-auto p-0 text-xs text-gray-400"
                              onClick={() => toggleExplanation(question.id)}
                            >
                              {showExplanation[question.id] ? "Hide" : "Show"} explanation
                              <ChevronDown
                                className={`h-3 w-3 ml-1 transition-transform ${
                                  showExplanation[question.id] ? "rotate-180" : ""
                                }`}
                              />
                            </Button>
                            {showExplanation[question.id] && (
                              <div className="mt-2 text-sm bg-gray-700/50 p-2 rounded">
                                <p>{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400 mb-2">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <h3 className="text-lg font-medium">{questions[currentQuestionIndex].question}</h3>
                    <RadioGroup
                      value={userAnswers[questions[currentQuestionIndex].id] || ""}
                      onValueChange={(value) => handleAnswerSelect(questions[currentQuestionIndex].id, value)}
                      className="space-y-3"
                    >
                      {questions[currentQuestionIndex].options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${i}`} className="border-gray-600" />
                          <Label htmlFor={`option-${i}`} className="text-sm font-normal">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-2">
            {quizSubmitted ? (
              <Button
                variant="outline"
                className="gap-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                onClick={handleRestartQuiz}
              >
                <RefreshCw className="h-4 w-4" />
                <span>Restart Quiz</span>
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                  Previous
                </Button>
                <div className="flex gap-2">
                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      onClick={handleSubmitQuiz}
                      className="bg-yellow-600 hover:bg-yellow-700"
                      disabled={Object.keys(userAnswers).length < questions.length}
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} className="bg-gray-700 hover:bg-gray-600">
                      Next
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
