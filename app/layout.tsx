
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import "./env" // Import environment variables
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "YouTube Learning Platform",
  description: "Learn from YouTube playlists like a structured course",
    generator: 'anurag'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeClass="dark"
  return (
    <ClerkProvider>
      <html lang="en" className={themeClass} suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" />
        </head>
        
        <body className={inter.className}>
        
          
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Analytics/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    
  )
}
