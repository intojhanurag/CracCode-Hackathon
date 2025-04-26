// Environment variables
export const YOUTUBE_API_KEY = "AIzaSyCwHrIzKCNwNx1mOznscLeWhOsBqnktxPQ"
export const GROQ_API_KEY = "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"

// Make them available to the Next.js app
if (typeof process !== "undefined") {
  process.env.NEXT_PUBLIC_YOUTUBE_API_KEY = YOUTUBE_API_KEY
  process.env.GROQ_API_KEY = GROQ_API_KEY
}
