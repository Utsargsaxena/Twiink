# 🗨️ **Klyno — Real-Time Chat App**

**Klyno** is a full-stack MERN chat application built with modern web technologies, supporting real-time messaging, online user tracking, authentication, and a responsive UI. It leverages **Socket.IO** for live updates, **Zustand** for state management, and **TailwindCSS + DaisyUI** for clean styling.

## **🚀 Live Demo**
(https://twiink.onrender.com)

## **🧰 Tech Stack**

### 🔹 **Frontend**
- React.js
- Zustand (Global State)
- Tailwind CSS + DaisyUI
- Axios
- React Hot Toast
- Vite

### 🔹 **Backend**
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs
- Cloudinary
- CORS & Cookies

## **🔐 Authentication Flow**
- Signup & Login generate a JWT token (stored in HTTP-only cookies)
- Session maintained via `/auth/check` endpoint
- Secure logout with token invalidation

## **💬 Real-Time Features**
- Online user tracking
- Instant message delivery via Socket.IO
- Messages appear in real-time without refresh
- Online status (green dot) per user

## **📁 Folder Structure (Simplified)**
```
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
├── package.json (root)
```

## **🛠 How to Run Locally**

1. **Clone the repository**
```bash
git clone https://github.com/Utsargsaxena/Klyno.git
cd Klyno
```

2. **Install dependencies**
```bash
npm install --prefix frontend
npm install --prefix backend
```

3. **Create a `.env` file**
```
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

4. **Start in development** (use two terminals)
```bash
npm run dev --prefix frontend
npm run dev --prefix backend
```

## **✅ Features Implemented**
- Secure auth with JWT cookies
- Zustand store for global state
- Real-time messaging with Socket.IO
- Cloudinary image uploads
- Fully responsive UI
- Online users tracking
- Working deployed version

## **👨‍💻 Author**
Built by Utsarg Saxena — [GitHub](https://github.com/Utsargsaxena)
