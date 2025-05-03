🗨️ Klyno — Real-Time Chat App
Klyno is a full-stack MERN chat application built with modern web technologies, supporting real-time messaging, online user tracking, authentication, and a responsive UI. It leverages Socket.IO for live updates, Zustand for state management, and TailwindCSS + DaisyUI for clean styling.

🚀 Live Demo
🌐 Frontend: https://twiink.onrender.com
🛠 Backend API: https://twiink-api.onrender.com

🧰 Tech Stack
🔹 Frontend
React.js

Zustand (Global State)

Tailwind CSS + DaisyUI (Styling)

Axios (API calls)

React Hot Toast (Feedback & Alerts)

Vite (Build Tool)

🔹 Backend
Express.js

MongoDB + Mongoose

Socket.IO (Real-time communication)

JWT Authentication

bcryptjs (Password hashing)

Cloudinary (Optional: Profile image upload)

CORS & Cookies (For secure session handling)

🔐 Authentication Flow
Signup & Login generates a JWT token (stored in HTTP-only cookies).

Session is maintained and verified using /auth/check on page load.

Secure logout with token invalidation.

💬 Real-Time Features
Online users tracking

Instant message delivery using Socket.IO

New messages auto-appended without page reload

User status indication (green dot for online users)

📁 Folder Structure (Simplified)
bash
Copy
Edit
Klyno/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── lib/ (e.g., db.js, socket.js)
│   └── src/index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── store/useAuthStore.js
│   └── vite.config.js
├── .env
├── package.json (global)
🛠 How to Run Locally
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/Utsargsaxena/Klyno.git
cd Klyno
2. Install dependencies
bash
Copy
Edit
npm install --prefix frontend
npm install --prefix backend
3. Create .env files
Add these to the root .env (do not commit to GitHub):

env
Copy
Edit
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
4. Start local development
bash
Copy
Edit
# In two terminals
npm run dev --prefix frontend
npm run dev --prefix backend
🌐 Deployment
Deployed on Render (both frontend and backend)

Uses NODE_ENV=production and CORS setup for secure deployment

Vite configured with --production=false to include devDependencies

✅ Features Completed
JWT-based authentication with secure cookie handling

Zustand-based global state

Socket.IO for real-time events

CORS setup with credentials

Cloudinary integration (optional)

Responsive layout with DaisyUI

Dynamic message rendering and profile management

Local and production-ready switching setup

