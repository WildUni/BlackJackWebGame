import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001", { 
    autoConnect: false,
});


