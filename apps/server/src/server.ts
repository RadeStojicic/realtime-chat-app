import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToMongoDB from "./db/connectToMongoDB";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
