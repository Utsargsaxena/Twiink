import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import MessageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import {app,server} from "./lib/socket.js"
import path from "path"
dotenv.config()

const __dirname = path.resolve();
const PORT = process.env.PORT

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true,
}) )

app.use( "/api/auth", authRoutes)
app.use("/api/messages" , MessageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/*", (req, res) => {
        res.sendFile(
          path.join(__dirname, "../frontend", "dist", "index.html")
        );
      });
      
}
server.listen(PORT , () => {
    console.log("Server  is running on port :"+PORT);
    connectDB()
})