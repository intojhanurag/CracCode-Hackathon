import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <SignUp
          appearance={{
            elements: {
              card: "bg-gray-800 border border-gray-700 shadow-lg rounded-lg", // Customize the card
              headerTitle: "text-white text-2xl font-bold", // Customize the header title
              headerSubtitle: "text-white/70", // Customize the subtitle
              formFieldLabel:"text-white/70 font-medium",
              formFieldInput: "bg-gray-900 text-white border-gray-700", // Customize input fields
              formButtonPrimary: "bg-red-600 hover:bg-red-700 text-white", // Customize the primary button
  
              socialButtonsBlockButtonText: "text-blue-400 font-semibold", // Customize "Sign in with Google" text
              socialButtonsBlockButton:"border border-red-500"
            },
          }}
          />
    </div>
  )
}
