import axiosClient from "../axiosClient";

const NotificationApis = {};

// Fetch all notifications
NotificationApis.getNotification = async () => {
  const url = "/api/admin/notification";
  const res = await axiosClient
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message || "An error occurred on the server.",
        };
      } else {
        return { message: "An error occurred while fetching notifications." };
      }
    });
  return res;
};

// Delete a specific notification
NotificationApis.deleteNotification = async (id) => {
    const url = `/api/admin/notification/${id}`; // Adjust the endpoint as per your backend API
    return axiosClient
      .delete(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return {
            errors: error.response.data.errors || null,
            message:
              error.response.data.message || "An error occurred on the server.",
          };
        } else {
          return { message: "An error occurred while deleting the notification." };
        }
      });
  };
  

export default NotificationApis;
