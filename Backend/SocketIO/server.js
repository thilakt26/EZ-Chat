import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express()

const server=http.createServer(app);

const io=new Server(server, {
    cors:{
        origin:"http://localhost:3001",
        methods:["GET","POST"],
        
    },
})

// function for real time msg
export const getRecieverSocketId=(recieverId)=>{
return users[recieverId]
}


const users={}

//used to listen the events on the server side
io.on ("connection",(socket)=>{
    console.log("user connected ",socket.id);

    const userId=socket.handshake.query.userId;

    if(userId){
        users[userId]=socket.id;
        console.log("hello",users)
    }

    io.emit("getOnlineUsers",Object.keys(users))//used to send to events to all the connected users



    //used to listen on the client side  events emited by server(&client as well)
    socket.on("disconnect",()=>{//if the user logged out
        console.log("User disconnected",socket.id )

        delete(users[userId]);
        io.emit("getOnlineUsers",Object.keys(users))

    })
})

export {app ,io , server}
