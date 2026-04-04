import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { API_BASE } from "../api/config.js";

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(API_BASE, {
      transports: ["websocket", "polling"],
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const joinRoom = useCallback((event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  const on = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off(event, callback);
      }
    };
  }, []);

  return { socket: socketRef, joinRoom, on };
};
