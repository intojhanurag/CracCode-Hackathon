// YouTube API integration
import { generateDocumentationResources } from "@/lib/groq-service"
import { YOUTUBE_API_KEY, GROQ_API_KEY } from "@/app/env"
export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: string
  position: number
  completed?: boolean
  progress?: number
}

export interface YouTubePlaylist {
  id: string
  title: string
  description: string
  channelTitle: string
  thumbnailUrl: string
  videos: YouTubeVideo[]
  totalVideos: number
  totalDuration: string
}

console.log("YouTube API Key:", YOUTUBE_API_KEY);
console.log("GROQ API Key:", GROQ_API_KEY);
// Convert ISO 8601 duration to readable format
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  const hours = match?.[1] ? Number.parseInt(match[1]) : 0
  const minutes = match?.[2] ? Number.parseInt(match[2]) : 0
  const seconds = match?.[3] ? Number.parseInt(match[3]) : 0

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Calculate total duration from video durations
function calculateTotalDuration(videos: YouTubeVideo[]): string {
  let totalSeconds = 0

  videos.forEach((video) => {
    const parts = video.duration.split(":")
    if (parts.length === 3) {
      // hours:minutes:seconds
      totalSeconds += Number.parseInt(parts[0]) * 3600 + Number.parseInt(parts[1]) * 60 + Number.parseInt(parts[2])
    } else if (parts.length === 2) {
      // minutes:seconds
      totalSeconds += Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
    }
  })

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  return `${minutes}m`
}

export async function fetchPlaylistDetails(playlistId: string): Promise<YouTubePlaylist> {
  try {
    // Step 1: Get playlist details
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${YOUTUBE_API_KEY}`,
    )
    const playlistData = await playlistResponse.json()

    if (!playlistData.items || playlistData.items.length === 0) {
      throw new Error("Playlist not found")
    }

    const playlistInfo = playlistData.items[0]

    // Step 2: Get playlist items (videos)
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`,
    )
    const videosData = await videosResponse.json()

    if (!videosData.items) {
      throw new Error("No videos found in playlist")
    }

    // Step 3: Get video details (for duration)
    const videoIds = videosData.items.map((item: any) => item.contentDetails.videoId).join(",")
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
    )
    const videoDetailsData = await videoDetailsResponse.json()

    // Map video details
    const videos: YouTubeVideo[] = videosData.items.map((item: any, index: number) => {
      const videoId = item.contentDetails.videoId
      const videoDetails = videoDetailsData.items.find((v: any) => v.id === videoId)

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        duration: videoDetails ? formatDuration(videoDetails.contentDetails.duration) : "0:00",
        position: index + 1,
        completed: false,
        progress: 0,
      }
    })

    return {
      id: playlistId,
      title: playlistInfo.snippet.title,
      description: playlistInfo.snippet.description,
      channelTitle: playlistInfo.snippet.channelTitle,
      thumbnailUrl: playlistInfo.snippet.thumbnails.high?.url || playlistInfo.snippet.thumbnails.default?.url,
      videos,
      totalVideos: videos.length,
      totalDuration: calculateTotalDuration(videos),
    }
  } catch (error) {
    console.error("Error fetching playlist:", error)
    throw error
  }
}

export async function fetchUserProgress(userId: string, playlistId: string): Promise<Record<string, number>> {
  // In a real app, this would fetch from your database
  // For now, we'll use localStorage in the client component
  return {}
}

export async function updateVideoProgress(userId: string, videoId: string, progress: number): Promise<void> {
  // In a real app, this would update your database
  // For now, we'll use localStorage in the client component
}

// New function to fetch documentation resources for a video
export async function fetchDocumentationResources(videoTitle: string, videoDescription: string) {
  try {
    // Use API route to generate documentation resources
    const resources = await generateDocumentationResources(videoTitle, videoDescription)

    // If Groq returns resources, use them
    if (resources && resources.length > 0) {
      return resources
    }

    // Otherwise, fall back to mock data based on the video title
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
  } catch (error) {
    console.error("Error fetching documentation resources:", error)
    // Return a minimal set of fallback resources
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
