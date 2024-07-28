import React from "react";
import { useNotifications } from "../context/NotificationContext";
import Button from "./Button";

const NotificationButtons: React.FC = () => {
  const { addNotification } = useNotifications();

  return (
    <div className="btns-container">
      <Button
        title={"Notification 1"}
        onClick={() => addNotification("Notification 1")}
      />
      <Button
        title={"Notification 2"}
        onClick={() => addNotification("Notification 2")}
      />
      <Button
        title={"Notification 3"}
        onClick={() => addNotification("Notification 3")}
      />
    </div>
  );
};

export default NotificationButtons;
