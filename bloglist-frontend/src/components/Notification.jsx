import { Alert } from "@mui/material";
import NotificationContext from "../hooks/notificationContext";
import { useContext } from "react";

const Notification = () => {
  const { message } = useContext(NotificationContext);
  console.log("===MESSAGE===", message);
  if (!message) return null;

  return (
    <Alert
      style={{ fontSize: "15px", paddingLeft: "100px" }}
      severity={message.type}
    >
      {message.text}
    </Alert>
  );
};

export default Notification;
