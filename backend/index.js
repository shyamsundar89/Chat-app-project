import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import getDetails from './utils/getDetails.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' } // your frontend URL
});

app.use(cors());
app.use(express.json());

// --- Routes will go here later ---
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Socket.io
const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = receiver => userSocketMap[receiver];

io.on("connection", async socket => {

  // Extracting User Details from accesstoken
  const user = await getDetails(socket.handshake.query.token);
  const userId = user?._id?.toString();

  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // ✅ attach to socket object
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("a user connected", userId);
  }

  socket.emit("getDetails", user);

  socket.on("newMessage", ({ receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId]
    
    if (receiverSocketId) {
      const receivedMessage = {
        senderId: userId,
        receiverId,
        message,
      }
      
      io.to(receiverSocketId).emit("newMessage", receivedMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.userId);
    delete userSocketMap[socket.userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
