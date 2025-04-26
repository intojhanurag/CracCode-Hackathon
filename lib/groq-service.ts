// Client-side service for Groq API calls via API routes
export async function generateAssignment(videoTitle: string, videoDescription: string): Promise<string[]> {
  try {
    const response = await fetch("/api/groq/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoTitle, videoDescription }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate assignment: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating assignment:", error)
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
    // Ensure we have valid inputs
    const title = videoTitle || "Programming Tutorial"
    const description = videoDescription || "A programming tutorial video"

    const response = await fetch("/api/groq/documentation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoTitle: title, videoDescription: description }),
    })

    // Even if the response is not OK, try to parse it as JSON
    // as our API is designed to return fallback data even on errors
    const data = await response.json()

    // If we got an array, return it
    if (Array.isArray(data)) {
      return data
    }

    // Otherwise, return an empty array
    return []
  } catch (error) {
    console.error("Error generating documentation resources:", error)
    // Return fallback resources
    return [
      {
        title: "Programming Best Practices",
        url: "https://github.com/sindresorhus/awesome",
        type: "github",
        source: "GitHub - Sindre Sorhus",
      },
    ]
  }
}
