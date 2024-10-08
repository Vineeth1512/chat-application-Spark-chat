import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnect from "./config/databaseConnect.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";

const __dirname = path.resolve();

dotenv.config();
//const app = express();

//Middlewares
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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
