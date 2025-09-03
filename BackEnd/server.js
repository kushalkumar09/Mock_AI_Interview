import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { GoogleGenerativeAI } from "@google/generative-ai";
import router from "./routes/route.js";
import connectDB from "./database/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000", // Allow requests from React frontend
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed HTTP methods
    credentials: true, // Allow cookies and other credentials
  })
);

connectDB();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 4000,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({ generationConfig });

app.use("/api", router);
app.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
);
