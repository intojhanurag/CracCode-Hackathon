// Gemini API integration
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export async function generateAssignment(videoTitle: string, videoDescription: string): Promise<string[]> {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Prepare the prompt
    const prompt = `
    Based on this YouTube video titled "${videoTitle}" with the following description:
    "${videoDescription}"
    
    Generate 5 practice questions or assignments that would help someone apply what they learned in the video.
    These should be practical, challenging but doable, and help the learner escape "tutorial hell" by applying the concepts.
    
    Format the response as a JSON array of strings, with each string being a question or assignment.
    `

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract the JSON array from the response
    try {
      // Try to parse the entire response as JSON
      const questions = JSON.parse(text)
      if (Array.isArray(questions)) {
        return questions
      }

      // If the response contains a code block with JSON
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        const questions = JSON.parse(jsonMatch[1])
        if (Array.isArray(questions)) {
          return questions
        }
      }

      // Fallback: Split by newlines and clean up
      return text
        .split("\n")
        .filter((line) => line.trim() && !line.includes("```"))
        .map((line) => line.replace(/^[0-9]+\.\s*/, "").trim())
        .filter((line) => line.length > 10)
        .slice(0, 5)
    } catch (error) {
      console.error("Error parsing Gemini response:", error)
      // Fallback to default questions
      return [
        `Explain the key concepts covered in "${videoTitle}".`,
        "Implement a simple example using the techniques shown in the video.",
        "What challenges might you face when applying this in a real project?",
        "How would you extend the functionality shown in the video?",
        "Compare this approach with alternative methods you've used before.",
      ]
    }
  } catch (error) {
    console.error("Error generating assignment with Gemini:", error)
    // Fallback to default questions
    return [
      `Explain the key concepts covered in "${videoTitle}".`,
      "Implement a simple example using the techniques shown in the video.",
      "What challenges might you face when applying this in a real project?",
      "How would you extend the functionality shown in the video?",
      "Compare this approach with alternative methods you've used before.",
    ]
  }
}

export async function generateDocumentationResources(videoTitle: string, videoDescription: string): Promise<any[]> {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Prepare the prompt
    const prompt = `
    Based on this YouTube video titled "${videoTitle}" with the following description:
    "${videoDescription}"
    
    Generate 3-5 documentation resources, articles, or GitHub repositories that would help someone deepen their understanding of the topics covered in this video.
    These should help the learner escape "tutorial hell" by providing additional context and reference materials.
    
    Format the response as a JSON array of objects, with each object having the following properties:
    - title: The title of the resource
    - url: The URL to the resource
    - type: One of "article", "documentation", "github", or "tutorial"
    - source: The source/website of the resource
    
    Make sure all URLs are real and accurate.
    `

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract the JSON array from the response
    try {
      // Try to parse the entire response as JSON
      const resources = JSON.parse(text)
      if (Array.isArray(resources)) {
        return resources
      }

      // If the response contains a code block with JSON
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        const resources = JSON.parse(jsonMatch[1])
        if (Array.isArray(resources)) {
          return resources
        }
      }

      // If we can't parse the response, return an empty array
      // The fetchDocumentationResources function in youtube-service.ts will provide fallback resources
      return []
    } catch (error) {
      console.error("Error parsing Gemini documentation response:", error)
      return []
    }
  } catch (error) {
    console.error("Error generating documentation resources with Gemini:", error)
    return []
  }
}
