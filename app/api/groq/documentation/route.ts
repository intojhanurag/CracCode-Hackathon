import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "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",
})

export async function POST(request: NextRequest) {
  try {
    const { videoTitle, videoDescription } = await request.json()

    // Generate fallback resources based on the video title
    const fallbackResources = generateFallbackResources(videoTitle)

    try {
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
        const resources = JSON.parse(responseText)
        if (Array.isArray(resources) && resources.length > 0) {
          return NextResponse.json(resources)
        }

        // If the response contains a code block with JSON
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || responseText.match(/```\n([\s\S]*?)\n```/)
        if (jsonMatch && jsonMatch[1]) {
          const resources = JSON.parse(jsonMatch[1])
          if (Array.isArray(resources) && resources.length > 0) {
            return NextResponse.json(resources)
          }
        }

        // If we can't parse the response, return fallback resources
        return NextResponse.json(fallbackResources)
      } catch (error) {
        console.error("Error parsing Groq documentation response:", error)
        return NextResponse.json(fallbackResources)
      }
    } catch (error) {
      console.error("Error with Groq API call:", error)
      return NextResponse.json(fallbackResources)
    }
  } catch (error) {
    console.error("Error in documentation resources API route:", error)
    // Return a 200 response with fallback data instead of an error
    return NextResponse.json([
      {
        title: "General Programming Resources",
        url: "https://github.com/sindresorhus/awesome",
        type: "github",
        source: "GitHub - Sindre Sorhus",
      },
    ])
  }
}

// Generate fallback resources based on video title
function generateFallbackResources(videoTitle: string) {
  const keywords = videoTitle?.toLowerCase() || ""

  if (keywords.includes("react")) {
    return [
      {
        title: "React Official Documentation",
        url: "https://reactjs.org/docs/getting-started.html",
        type: "documentation",
        source: "reactjs.org",
      },
      {
        title: "Building Thinking in React - Official Tutorial",
        url: "https://react.dev/learn/thinking-in-react",
        type: "documentation",
        source: "react.dev",
      },
      {
        title: "React Patterns and Best Practices",
        url: "https://github.com/reactpatterns/reactpatterns",
        type: "github",
        source: "GitHub - React Patterns",
      },
    ]
  } else if (keywords.includes("javascript") || keywords.includes("js")) {
    return [
      {
        title: "MDN JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        type: "documentation",
        source: "developer.mozilla.org",
      },
      {
        title: "JavaScript.info - The Modern JavaScript Tutorial",
        url: "https://javascript.info/",
        type: "tutorial",
        source: "javascript.info",
      },
      {
        title: "You Don't Know JS (book series)",
        url: "https://github.com/getify/You-Dont-Know-JS",
        type: "github",
        source: "GitHub - Kyle Simpson",
      },
    ]
  } else if (keywords.includes("typescript") || keywords.includes("ts")) {
    return [
      {
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
        type: "documentation",
        source: "typescriptlang.org",
      },
      {
        title: "TypeScript Deep Dive",
        url: "https://basarat.gitbook.io/typescript/",
        type: "tutorial",
        source: "gitbook.io",
      },
      {
        title: "Effective TypeScript: 62 Specific Ways to Improve Your TypeScript",
        url: "https://effectivetypescript.com/",
        type: "article",
        source: "effectivetypescript.com",
      },
    ]
  } else {
    // Generic programming resources
    return [
      {
        title: "The Pragmatic Programmer",
        url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
        type: "article",
        source: "pragprog.com",
      },
      {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
        type: "article",
        source: "oreilly.com",
      },
      {
        title: "Awesome Lists - Curated list of awesome lists",
        url: "https://github.com/sindresorhus/awesome",
        type: "github",
        source: "GitHub - Sindre Sorhus",
      },
    ]
  }
}
