import {Server} from "socket.io";
import http from "http"
import express from "express"


const app = express();

const server = http.createServer(app);

// CORS configuration for Socket.IO - supports single origin or comma-separated origins
const allowedOrigins = process.env.ORIGIN 
    ? process.env.ORIGIN.split(',').map(origin => origin.trim())
    : [];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins.length > 0 ? allowedOrigins : true, // Allow all if not configured (development)
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Add polling as fallback for production
});

const users = {}
//real time message code
export const getReceiverSocketId = (receiverId) =>{
    return users[receiverId];
}


io.on("connection", (socket)=>{
    console.log("New Client Connected", socket.id)
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId] = socket.id;
        console.log(`User ${userId} connected with socket ${socket.id}`)
    } else {
        console.warn("Connection attempt without userId")
    }

    io.emit("getOnline", Object.keys(users))

    socket.on("disconnect", ()=>{
        console.log("Client disconnected", socket.id)
        if(userId && users[userId]){
            delete users[userId];
            io.emit("getOnline", Object.keys(users))
        }
    })

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
})

export {app,io,server}