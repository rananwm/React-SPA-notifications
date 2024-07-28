import React from "react";
import { useNotifications } from "../context/NotificationContext";
import Button from "./Button";
import Tick from "../assets/check-mark.png";

const NotificationList: React.FC = () => {
  const { notifications, markAsRead } = useNotifications();

  const unreadNotifications = notifications.filter((notif) => !notif.read);
  const readNotifications = notifications.filter((notif) => notif.read);

  return (
    <div className="notifications-container">
      <div className="unread-notifications">
        <h2>Unread Notifications</h2>
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((notif) => (
            <div key={notif.id} className="notification">
              {notif.message}
              <Button
                onClick={() => markAsRead(notif.id)}
                title="Mark as Read"
              />
            </div>
          ))
        ) : (
          <h3>No Unread Notifications</h3>
        )}
      </div>
      <div className="read-notifications">
        <h2>Read Notifications</h2>
        {readNotifications.length > 0 ? (
          readNotifications.map((notif) => (
            <div key={notif.id} className="notification">
              {notif.message}
              <img src={Tick} alt="Read" style={{ height: 16, width: 16 }} />
            </div>
          ))
        ) : (
          <h3>No Read Notifications</h3>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
