import express from "express";
import ballerRouter from "./routes/baller.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

// creating server and using middlewares
export const app = express();

config({
    path: "./db/config.env",
});

app.use(express.json()); //middleware
app.use(cookieParser());
app.use(cors({
    origin: [
        "https://todo-frontend-opal-seven.vercel.app",
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.FRONT_END_URL,
        process.env.FRONT_END_URL_ORIGINAL,
    ],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}));

app.use("/api/v1/user", ballerRouter); //route
app.use("/api/v1/task", taskRouter); //route

app.get("/", (req, res)=>{
    res.send("Konichiva!!");
});

//using the error middleware 
app.use(errorMiddleware);



