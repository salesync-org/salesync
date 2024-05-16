import { createContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useAuth from '@/hooks/useAuth';

type NotificationContext = {
  notifications: NotificationMessage[];
};
const websocketHost = import.meta.env.VITE_NOTIFICATION_HOST;

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const username = user.user_id; // Get the username for user-specific subscription
    const socket = new SockJS(websocketHost + '/notifications-websocket');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log('Connected to WebSocket server!');

      // Subscribe to receive messages on the user-specific destination
      stompClient.subscribe(`/user/${username}/receiver`, (message) => {
        console.log('Received message:', message.body);
        const newMessage: NotificationMessage = JSON.parse(message.body);
        setNotifications((prevNotifications) => [...prevNotifications, newMessage]); // Update state in a controlled manner
      });

      // Send a test message to the server (optional, remove if not needed)
      // stompClient.send('/app/test', {}, JSON.stringify({ message: 'Hello from client!' })); // Optional
    });

    stompClient.onWebSocketClose = (event) => {
      console.log('Disconnected from WebSocket server:', event.reason);
    };

    // Cleanup function: Close the WebSocket connection on unmount
    return () => {
      stompClient.disconnect();
    };
  }, [user]);

  return <NotificationContext.Provider value={{ notifications }}>{children}</NotificationContext.Provider>;
};

export const NotificationContext = createContext<NotificationContext | null>(null);

export default NotificationProvider;
