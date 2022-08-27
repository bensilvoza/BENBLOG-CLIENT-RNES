import { useState, createContext } from "react";

export const NotificationContext = createContext();

function NotificationContextProvider(props) {
  let [notificationMessage, setNotificationMessage] = useState(undefined);
  let [notificationColor, setNotificationColor] = useState(undefined);

  function handleNotification(message, color) {
    setNotificationMessage(message);
    setNotificationColor(color);
    return;
  }

  return (
    <NotificationContext.Provider
      value={{
        notificationMessage: notificationMessage,
        notificationColor: notificationColor,
        handleNotification: handleNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
