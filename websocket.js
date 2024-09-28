import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Message1 from "./websocketmodel.js";
import mongoose from "mongoose";
const app = express();
const port = 5001;
const server = createServer(app);
const io = new Server(server);

// Middleware
app.use(json());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://ritikkumar99590:ritikkumar@ritik.uxlfy6t.mongodb.net/websocket'
, { useNewUrlParser: true, useUnifiedTopology: true });


 

server.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});

io.on("connection", async (socket) => {
  console.log("connected");
  console.log(`${socket.id} has joined`);

  // Fetch and send all messages to the new client
   const messages = await Message1.find({});
   socket.emit("allMessages", messages); 
   console.log("connected",messages);
  socket.on("message", async (msg) => {
  
   const newMessage = new Message1({ message: msg["message"] 
   ,sentbyme:msg["sentbyme"],sendedid:msg["sendedid"]}); 
   console.log(`Message received: ${msg["sendedid"]}`);
   await newMessage.save();

    socket.broadcast.emit('message received', msg);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
  });
});
