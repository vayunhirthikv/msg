import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express();
const server=http.createServer(app);

const allowOrigin=process.env.FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: allowOrigin || "http://localhost:5173",
    credentials: true,
  },
});


const userSocketMap={};//key=>user id; value=>socket id

function getRecieverSocketId(userId){
    return userSocketMap[userId];
}


io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));//sends event to everyone-broadcast

    socket.on("disconnect",()=>{
        if(userId){
            delete userSocketMap[userId];
            io.emit("getOnlineUsers",Object.keys(userSocketMap));
        }

    })

});

export {app,server,io,getRecieverSocketId};