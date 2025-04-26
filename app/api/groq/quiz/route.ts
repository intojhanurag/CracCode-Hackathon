import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "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",
})

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export async function POST(request: NextRequest) {
  try {
    const { videoTitle, videoDescription } = await request.json()

    const prompt = `
    Based on this YouTube video titled "${videoTitle}" with the following description:
    "${videoDescription}"
    
    Generate 10 challenging multiple-choice quiz questions that test deep understanding of the concepts covered in the video.
    Each question should have 4 options (A, B, C, D) with only one correct answer.
    
    Format the response as a JSON array of objects, with each object having the following properties:
    - id: A unique string identifier (use a simple number like "q1", "q2", etc.)
    - question: The question text
    - options: An array of 4 strings representing the possible answers
    - correctAnswer: The correct answer (the exact string that matches one of the options)
    - explanation: A brief explanation of why the answer is correct
    
    Make the questions challenging but fair, focusing on important concepts from the video.
    `

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an educational assistant that creates high-quality learning materials.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.5,
      max_tokens: 2048,
    })

    const responseText = completion.choices[0]?.message?.content || ""

    try {
      // Try to parse the entire response as JSON
      const questions = JSON.parse(responseText)
      if (Array.isArray(questions) && questions.length > 0) {
        return NextResponse.json(questions.slice(0, 10)) // Ensure we only return 10 questions
      }

      // If the response contains a code block with JSON
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        const questions = JSON.parse(jsonMatch[1])
        if (Array.isArray(questions) && questions.length > 0) {
          return NextResponse.json(questions.slice(0, 10))
        }
      }

      // If we can't parse the response, return fallback questions
      return NextResponse.json(generateFallbackQuestions(videoTitle))
    } catch (error) {
      console.error("Error parsing Groq quiz response:", error)
      return NextResponse.json(generateFallbackQuestions(videoTitle))
    }
  } catch (error) {
    console.error("Error generating quiz with Groq:", error)
    return NextResponse.json(
      {
        error: "Failed to generate quiz",
      },
      { status: 500 },
    )
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
