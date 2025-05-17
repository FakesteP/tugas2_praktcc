import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import NoteRoute from "./routes/notesRoute.js";
import UserRoute from "./routes/userRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Konfigurasi CORS
const allowedOrigins = ["https://frontend-hafizh-dot-b-01-450713.uc.r.appspot.com/","http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Routing langsung di root
app.use(NoteRoute);
app.use(UserRoute);

// ✅ Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
);
