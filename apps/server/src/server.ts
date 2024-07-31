import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToMongoDB from "./db/connectToMongoDB";
import authRoutes from "./routes/auth.routes";
import messagesRoutes from "./routes/messages.routes";
import userRoutes from "./routes/user.routes";
import { app, server } from "./socket/socket";

app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
