const defaultAvatar = "https://via.placeholder.com/150";

class NotificationManager {
  static async requestPermission() {
    try {
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return false;
      }

      const permission = await Notification.requestPermission();
      return permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  static async showNotification({
    title,
    body,
    icon = defaultAvatar,
    tag = String(new Date().getTime()),
    requireInteraction = false,
    silent = false,
    timeout = 5000,
    onClick = () => {}
  }) {
    try {
      if (!("Notification" in window) || Notification.permission !== "granted") {
        return;
      }

      const notification = new Notification(title, {
        body,
        icon,
        tag,
        requireInteraction,
        silent
      });

      notification.onclick = function() {
        onClick();
        this.close();
      };

      if (timeout > 0) {
        setTimeout(() => {
          notification.close();
        }, timeout);
      }

      return notification;
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  }
}

export default NotificationManager;