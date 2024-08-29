import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "../store";
import { io } from "socket.io-client";

const HOST = "http://localhost:8000"; // Adjust as necessary

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      // Initialize socket connection
      socketRef.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
        transports: ["websocket", "polling"],
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      // Handler for incoming messages
      const handleReceiveMessage = (message) => {
        console.log("Message received:", message);
        const { addMessage } = useAppStore.getState();
        if (addMessage) {
          addMessage(message);
        } else {
          console.error("addMessage function is not available in the store.");
        }
      };

      socketRef.current.on("receiveMessage", handleReceiveMessage);

      // Cleanup function
      return () => {
        if (socketRef.current) {
          socketRef.current.off("receiveMessage", handleReceiveMessage); // Clean up listener
          socketRef.current.disconnect();
          console.log("Socket disconnected");
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
