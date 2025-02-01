import axiosClient from "../axiosClient";

const NotificationApis = {};

// Fetch all notifications
NotificationApis.getNotification = async () => {
  const url = "/api/admin/notification";
  // console.log("url", url);
  
  try {
    const response = await axiosClient.get(url);
    // console.log("get response", response);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching notifications"
    };
  }
};

// Delete a specific notification
NotificationApis.deleteNotification = async (id) => {
  console.log("id", id);
  
  const url = `/api/admin/notification/${id}`;
  // console.log("delete url", url);
  
  try {
    const response = await axiosClient.delete(url);
    console.log("response", response);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Delete notification error:", error.response);
    return {
      success: false,
      message: error.response?.data?.message || "Error deleting notification"
    };
  }
};

// Delete all notifications
NotificationApis.deleteAllNotifications = async () => {
  const url = "/api/admin/notification";
  
  try {
    const response = await axiosClient.delete(url);
    console.log("delete all response", response);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Delete all notifications error:", error.response);
    return {
      success: false,
      message: error.response?.data?.message || "Error deleting all notifications"
    };
  }
};

export default NotificationApis;
