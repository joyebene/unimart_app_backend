import { Server } from "socket.io";
import http from "http";
import { DefaultEventsMap } from "socket.io";


let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        // Example of joining a room
        socket.on("joinRoom", (userId: string) => {
            socket.join(userId);
            console.log(`User ${socket.id} joined personal room ${userId}`);
        });

        // Joining a conversation room
        socket.on("joinConversation", (conversationId: string) => {
            socket.join(conversationId);
            console.log(`User ${socket.id} joined conversation room ${conversationId}`);
        });

    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};