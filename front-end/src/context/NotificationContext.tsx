import { createContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useAuth from '@/hooks/useAuth';
import instance from '@/api/axiosConfig';

type NotificationContext = {
  notifications: NotificationMessage[];
  newMessageCount?: number;
  clearNewNotificationCount: () => void;
  fetchNotifications: () => void;
  readAllMessage: () => void;
  readMessage: (notificationId: string) => void;
};
const websocketHost = import.meta.env.VITE_NOTIFICATION_HOST;

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [newMessageCount, setNewMessageCount] = useState<number>(0);
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
        setNewMessageCount((prevCount) => prevCount + 1); // Update new message count
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

  const clearNewNotificationCount = () => {
    setNewMessageCount(0);
  };

  const fetchNotifications = async () => {
    if (!user) {
      return;
    }
    const response = await instance.get(`${websocketHost}/notifications/${user.user_id}`);
    if (response) {
      const data: NotificationMessage[] = response.data;
      setNotifications([...data]);
      let newMessageCount = 0;
      data.forEach((notification) => {
        if (!notification.is_read) {
          newMessageCount++;
        }
      });
      setNewMessageCount(newMessageCount);
    }
  };

  const readAllMessage = async () => {
    if (!user) {
      return;
    }
    const response = await instance.put(`${websocketHost}/notifications/set-all-read/${user.user_id}`);
    if (response) {
      const data: NotificationMessage[] = response.data;
      setNotifications((prev) => {
        return prev.map((notification) => {
          if (data.includes(notification)) {
            notification.is_read = true;
          }
          return notification;
        });
      });
    }
  };

  const readMessage = async (notificationId: string) => {
    if (!user) {
      return;
    }
    const response = await instance.put(`${websocketHost}/notifications/set-read/${notificationId}`);
    if (response) {
      setNotifications((prev) => {
        return prev.map((prevNotification) => {
          if (prevNotification.id === notificationId) {
            prevNotification.is_read = true;
          }
          return prevNotification;
        });
      });
    }
  };

  const value: NotificationContext = {
    notifications,
    newMessageCount,
    clearNewNotificationCount,
    fetchNotifications,
    readAllMessage,
    readMessage
  };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const NotificationContext = createContext<NotificationContext | null>(null);

export default NotificationProvider;
