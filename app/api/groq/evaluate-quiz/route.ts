import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userAnswers, correctAnswers } = await request.json()

    const totalQuestions = Object.keys(correctAnswers).length
    let correctCount = 0
    const feedback: Record<string, { correct: boolean; explanation: string }> = {}

    // Compare user answers with correct answers
    for (const questionId in correctAnswers) {
      const userAnswer = userAnswers[questionId]
      const correctAnswer = correctAnswers[questionId]

      const isCorrect = userAnswer === correctAnswer
      if (isCorrect) {
        correctCount++
      }

      feedback[questionId] = {
        correct: isCorrect,
        explanation: isCorrect ? "Correct! Well done." : `Incorrect. The correct answer is: ${correctAnswer}`,
      }
    }

    const score = Math.round((correctCount / totalQuestions) * 100)

    return NextResponse.json({
      score,
      totalQuestions,
      correctCount,
      feedback,
    })
  } catch (error) {
    console.error("Error evaluating quiz answers:", error)
    return NextResponse.json(
      {
        error: "Failed to evaluate quiz answers",
      },
      { status: 500 },
    )
  }
}
