import { useContext } from "react";
import axiosClient from "../axiosClient";



const ChatApis = {
    sendMessage: (payload) => axiosClient.post("/api/chat/message", payload),
    fetchMessages: (conversationId) => axiosClient.get(`/api/chat/message?conversation_id=${conversationId}`)
  };

// কনভারসেশন তৈরি বা ফেচ করার জন্য ফাংশন
ChatApis.createOrFetchConversation = async (user, adminId) => {    
    try {
      const response = await axiosClient.post("/api/chat/conversation", {
        user_id: user,
        admin_id: adminId,
      });
      return response.data; 
    } catch (error) {
      console.error("Error creating or fetching conversation:", error);
      return null;
    }
  };
  

ChatApis.sendMessage = async (data) => {
    const url = "/api/chat/message";
    try {
        const response = await axiosClient.post(url, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return {
                errors: error.response.data.errors,
                message: error.response.data.message,
            };
        } else if (error.request) {
            return {
                message: "No response received from the server.",
            };
        } else {
            return {
                message: "An error occurred while processing the request.",
            };
        }
    }
};

ChatApis.fetchMessages = async (conversationID) => {
    const url = `/api/chat/message?conversation_id=${conversationID}`;
    try {
        const response = await axiosClient.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

export default ChatApis;
