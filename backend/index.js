import  express  from "express";
import dotenv from "dotenv";
import ToConnect from "./config/db.js";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {app,io,server} from "./socketIO/server.js"



dotenv.config();
ToConnect();

app.use(express.json())
app.use(cors())
app.use(cookieParser());

const PORT = process.env.PORT || 5001;
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)


server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
