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
    origin: [process.env.FRONT_END_URL],
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



