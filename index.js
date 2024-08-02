import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnect from "./config/databaseConnect.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";
dotenv.config();
//const app = express();

//Middlewares
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-application-spark-chat-frontend.vercel.app",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

server.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
  //database connection
  databaseConnect();
});
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to SparkChat Application.",
  });
});
