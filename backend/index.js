//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Utils
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

//Code
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes );

app.listen(PORT, () => console.log(`Server running on port:${PORT} ❤️`));
