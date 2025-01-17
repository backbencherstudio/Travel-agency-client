import axiosClient from "../axiosClient";

const ChatApis = {
  sendMessage: async (payload) => {
    try {
      const response = await axiosClient.post("/api/chat/message", payload);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
  

  fetchMessages: async (conversationId) => {
    try {
      const response = await axiosClient.get(`/api/chat/message?conversation_id=${conversationId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  createOrFetchConversation: async (user, adminId) => {
    try {
      const response = await axiosClient.post("/api/chat/conversation", {
        user_id: user,
        admin_id: adminId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating or fetching conversation:", error);
      throw error;
    }
  },

  fetchConversations: async () => {
    try {
      const response = await axiosClient.get("/api/chat/conversation");
      console.log("conversation:", response);
      
      return response.data.data;

    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  fetchUsers: async () => {
    try {
      const response = await axiosClient.get("/api/chat/user");
      console.log("Raw API Response:", response.data); // Log the full response
      return response.data.data; // Ensure you're returning the correct field
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  
};

export default ChatApis;
