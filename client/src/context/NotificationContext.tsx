import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
} from "../firebase";

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const fetchNotifications = async () => {
    const q = query(collection(db, "notifications"));
    const querySnapshot = await getDocs(q);
    const fetchedNotifications: Notification[] = [];
    querySnapshot.forEach((doc) => {
      fetchedNotifications.push({
        id: doc.id,
        ...doc.data(),
      } as Notification);
    });
    setNotifications(fetchedNotifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const addNotification = async (message: string) => {
    const docRef = await addDoc(collection(db, "notifications"), {
      message,
      read: false,
    });
    setNotifications([
      ...notifications,
      { id: docRef.id, message, read: false },
    ]);
  };

  const markAsRead = async (id: string) => {
    const notificationDoc = doc(db, "notifications", id);
    await updateDoc(notificationDoc, { read: true });
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
