import React, { createContext, useEffect, useState } from 'react';

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://192.168.0.127:8080/location');
    setWs(webSocket);

    webSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    webSocket.onerror = (e) => {
      console.error('WebSocket error', e.message);
    };

    webSocket.onclose = (e) => {
      console.log('WebSocket connection closed', e.code, e.reason);
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => React.useContext(WebSocketContext);
