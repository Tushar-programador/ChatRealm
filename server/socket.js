import { Server as SocketIoServer } from "socket.io";
import Message from "./models/MessageModel.js";

const setupSocket = (server) => {
  const userSocketMap = new Map();
  console.log("Setting up socket");

  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"],
    },
  });

  const disconnect = (socket) => {
    console.log("Disconnect client " + socket.id);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        console.log("User disconnected:", userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    console.log("Received message for sending:", message);

    const recipientSocketId = userSocketMap.get(message.receiver);
    const senderSocketId = userSocketMap.get(message.sender);

    console.log("Recipient Socket ID:", recipientSocketId);
    console.log("Sender Socket ID:", senderSocketId);

    try {
      // Create and save the message to the database
      const createMessage = await Message.create({
        sender: message.sender,
        recipient: message.receiver, // Correct field name
        messageType: message.messageType,
        content: message.message,
        fileUrl: message.fileUrl,
      });

      // Populate the message with sender and recipient details
      const messageData = await Message.findById(createMessage._id)
        .populate("sender", "id email firstName lastName profileImage color")
        .populate(
          "recipient",
          "id email firstName lastName profileImage color"
        );

      // Emit the message to the recipient
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", messageData);
        console.log("Message sent to recipient:", messageData);
      } else {
        console.log("Recipient not connected");
      }

      // Emit the message to the sender
      if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", messageData);
        console.log("Message sent to sender:", messageData);
      } else {
        console.log("Sender not connected");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  io.on("connection", (socket) => {
    console.log("New client connected");

    const userID = socket.handshake.query.userId;
    console.log("User ID:", userID);

    if (userID) {
      userSocketMap.set(userID, socket.id);
      console.log("User connected:", userID);
    } else {
      console.log("Invalid user ID");
      socket.disconnect();
      return;
    }

    socket.on("sendMessage", async (message) => {
      console.log("Backend received message:", message);
      try {
        await sendMessage(message);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
