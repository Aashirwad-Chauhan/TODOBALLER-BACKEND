import { app } from "./app.js";
import {connectDB} from "./db/database.js";

connectDB();
app.listen(process.env.PORT, ()=>{
    console.log("At the Server!!");
    console.log(`PORT: ${process.env.PORT} | MODE: ${process.env.NODE_ENV}` );
});