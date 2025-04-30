# 🎓 YouTube Learning Platform

Welcome to **YouTube Learning Platform**, a structured and interactive way to learn from YouTube playlists. This platform transforms YouTube videos into a course-like experience with features like progress tracking, quizzes, assignments, and documentation resources. 🚀

---

## 🌟 Features

- **📚 Structured Learning**: Organize YouTube playlists into structured courses.
- **✅ Progress Tracking**: Track your progress for each video and playlist.
- **📝 Notes**: Take notes while watching videos to reinforce learning.
- **🧠 Quizzes & Assignments**: Test your knowledge with quizzes and assignments.
- **📄 Documentation**: Access curated resources like articles, GitHub repositories, and tutorials.
- **🔒 Authentication**: Secure sign-up and login using Clerk.
- **🎨 Dark Mode**: Beautiful dark mode for a better viewing experience.

---

## 🖼️ Screenshots

### Dashboard
![Dashboard Screenshot](public/screenshots/dashboard.png)

### Video Notes
![Notes Screenshot](public/screenshots/notes.png)

### Quizzes
![Quiz Screenshot](public/screenshots/quiz.png)

---

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **APIs**: YouTube Data API, Custom GROQ API

---

## 🛠️ Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- YouTube Data API Key
- Clerk API Key

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. Install dependencies
   pnpm install
3. Create a .env file in the root directory and add the following:
  NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
  GROQ_API_KEY=your_groq_api_key
  MONGO_URI=your_mongodb_connection_string
  CLERK_API_KEY=your_clerk_api_key
4. Run the development server
   pnpm dev
5. Open http://localhost:3000 in your browser.

📂 Folder Structure:
.
├── app/
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard pages
│   ├── profile/            # User profile pages
│   ├── sign-in/            # Authentication pages
│   ├── sign-up/            # Registration pages
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and services
├── public/                 # Static assets
├── styles/                 # Global styles
├── .env                    # Environment variables
├── [tailwind.config.ts](http://_vscodecontentref_/0)      # Tailwind CSS configuration
└── [tsconfig.json](http://_vscodecontentref_/1)           # TypeScript configuration

🛡️ Security
Environment Variables: Sensitive keys like API keys are stored in .env files.
Authentication: User authentication is handled securely using Clerk.

🧑‍💻 Contributing
We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
  git checkout -b feature-name
3. Commit your changes
   git commit -m "Add your message here"
4. push to your branch
   git push origin feature-name
5. Open to pull request

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgments
Clerk for authentication.
Tailwind CSS for styling.
YouTube Data API for video data.
MongoDB for database management.

📧 Contact
For any questions or feedback, feel free to reach out:

Email: your-email@example.com
GitHub: @your-username
LinkedIn: Your Name

⭐ Star the Repository
If you found this project helpful, please give it a ⭐ on GitHub!
