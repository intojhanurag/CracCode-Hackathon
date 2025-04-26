export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export async function generateQuiz(videoTitle: string, videoDescription: string): Promise<QuizQuestion[]> {
  try {
    const response = await fetch("/api/groq/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoTitle, videoDescription }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate quiz: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating quiz:", error)
    return generateFallbackQuestions(videoTitle)
  }
}

// Generate fallback questions if the API fails
function generateFallbackQuestions(videoTitle: string): QuizQuestion[] {
  const questions: QuizQuestion[] = []

  // Create 10 generic questions based on the video title
  for (let i = 1; i <= 10; i++) {
    questions.push({
      id: `q${i}`,
      question: `Question ${i} about ${videoTitle}: What is the most important concept covered?`,
      options: [
        "The fundamental principles",
        "The advanced techniques",
        "The practical applications",
        "The theoretical framework",
      ],
      correctAnswer: "The practical applications",
      explanation:
        "The practical applications are typically the most important aspect as they allow you to apply the knowledge in real-world scenarios.",
    })
  }

  return questions
}

// Evaluate a user's quiz answers
export async function evaluateQuizAnswers(
  userAnswers: Record<string, string>,
  correctAnswers: Record<string, string>,
): Promise<{
  score: number
  totalQuestions: number
  correctCount: number
  feedback: Record<string, { correct: boolean; explanation: string }>
}> {
  try {
    const response = await fetch("/api/groq/evaluate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userAnswers, correctAnswers }),
    })

    if (!response.ok) {
      throw new Error(`Failed to evaluate quiz: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error evaluating quiz:", error)

    // Fallback evaluation logic
    const totalQuestions = Object.keys(correctAnswers).length
    let correctCount = 0
    const feedback: Record<string, { correct: boolean; explanation: string }> = {}

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

    return {
      score,
      totalQuestions,
      correctCount,
      feedback,
    }
  }
}
