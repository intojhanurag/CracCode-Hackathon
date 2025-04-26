import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "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",
})

export async function POST(request: NextRequest) {
  try {
    const { videoTitle, videoDescription } = await request.json()

    const prompt = `
    Based on this YouTube video titled "${videoTitle}" with the following description:
    "${videoDescription}"
    
    Generate 5 practice questions or assignments that would help someone apply what they learned in the video.
    These should be practical, challenging but doable, and help the learner escape "tutorial hell" by applying the concepts.
    
    Format the response as a JSON array of strings, with each string being a question or assignment.
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
      max_tokens: 1024,
    })

    const responseText = completion.choices[0]?.message?.content || ""

    try {
      // Try to parse the entire response as JSON
      const questions = JSON.parse(responseText)
      if (Array.isArray(questions)) {
        return NextResponse.json(questions)
      }

      // If the response contains a code block with JSON
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        const questions = JSON.parse(jsonMatch[1])
        if (Array.isArray(questions)) {
          return NextResponse.json(questions)
        }
      }

      // Fallback: Split by newlines and clean up
      const fallbackQuestions = responseText
        .split("\n")
        .filter((line) => line.trim() && !line.includes("```"))
        .map((line) => line.replace(/^[0-9]+\.\s*/, "").trim())
        .filter((line) => line.length > 10)
        .slice(0, 5)

      return NextResponse.json(fallbackQuestions)
    } catch (error) {
      console.error("Error parsing Groq response:", error)
      // Fallback to default questions
      const defaultQuestions = [
        `Explain the key concepts covered in "${videoTitle}".`,
        "Implement a simple example using the techniques shown in the video.",
        "What challenges might you face when applying this in a real project?",
        "How would you extend the functionality shown in the video?",
        "Compare this approach with alternative methods you've used before.",
      ]
      return NextResponse.json(defaultQuestions)
    }
  } catch (error) {
    console.error("Error generating assignment with Groq:", error)
    return NextResponse.json(
      {
        error: "Failed to generate assignment",
      },
      { status: 500 },
    )
  }
}
