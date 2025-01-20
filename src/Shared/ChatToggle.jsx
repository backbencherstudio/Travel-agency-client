import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import MessageRight from "../Components/Dashboard/chat/Components/MessageLeft";
import MessageLeft from "../Components/Dashboard/chat/Components/MessageRight";
import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import ChatApis from "../Apis/ChatApis";

const ChatToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { user } = useContext(AuthContext);

  const fetchConversations = async () => {
    try {
      const response = await axiosClient.get("/api/chat/conversation");
      setConversations(response.data.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const response = await axiosClient.get("/api/chat/user");
      const admins = response.data.data.filter((user) => user.type === "admin");
      setAdminUsers(admins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const fetchMessages = async () => {
    if (activeConversation) {
      try {
        const response = await axiosClient.get(
          `/api/chat/message?conversation_id=${activeConversation.id}`
        );
        setMessages(response.data.data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  // Fetch conversations
  useEffect(() => {
    fetchConversations();
    fetchAdminUsers();
  }, []);

  const handleAdminClick = async (admin) => {
    // Check if conversation exists
    const existingConversation = conversations.find(
      (conv) => conv.admin?.id === admin.id
    );

    if (existingConversation) {
      setActiveConversation(existingConversation);
      return;
    }

    // Create new conversation
    try {
      const response = await axiosClient.post("/api/chat/conversation", {
        creator_id: user.id,
        participant_id: admin.id,
      });

      setActiveConversation(response.data.data);
      setConversations([...conversations, response.data.data]);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // Fetch messages when conversation changes
  useEffect(() => {
    fetchMessages();
  }, [activeConversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      // Create message object
      const messageData = {
        conversation_id: activeConversation.id,
        receiver_id: activeConversation.participant_id,
        message: newMessage,
      };

      // Add message to local state immediately
      const newMsg = {
        message: newMessage,
        sender: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
        receiver: {
          id: activeConversation.participant_id,
        },
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMsg]);

      // Send to API
      await ChatApis.sendMessage(messageData);

      // Clear input
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [activeConversation, messages]);

  return (
    <div className="fixed bottom-[11%] right-[3%] z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-[#f974164b] text-[#f97316] rounded-full shadow-lg transition hover:bg-[#f97316] hover:text-[#f2f2f2]"
      >
        <IoChatbubbleEllipsesSharp className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-[18%] right-[3%] w-[400px] h-[400px] bg-white shadow-lg rounded-lg overflow-hidden">
          {!activeConversation ? (
            <div className="p-4">
              <h5 className="text-xl font-bold mb-4">Conversations</h5>
              <div className="overflow-y-auto h-[calc(100%-50px)]">
                {adminUsers.map((admin) => (
                  <div
                    key={admin.id}
                    onClick={() => handleAdminClick(admin)}
                    className="flex items-center p-3 cursor-pointer hover:bg-gray-50 rounded-lg"
                  >
                    <img
                      src={admin.avatar || "/default-avatar.jpg"}
                      className="rounded-full h-10 w-10 object-cover"
                      alt={admin.name}
                    />
                    <div className="ml-3">
                      <h6 className="font-medium">{admin.name}</h6>
                      <p className="text-sm text-gray-500">
                        {conversations.some(
                          (conv) => conv.admin?.id === admin.id
                        )
                          ? "Continue chat"
                          : "Start new chat"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 bg-gray-100 flex items-center">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="mr-4 px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Back
                </button>
                <img
                  src={
                    activeConversation.participant?.avatar ||
                    "/default-avatar.jpg"
                  }
                  className="rounded-full h-8 w-8 object-cover"
                  alt={activeConversation.participant?.name}
                />
                <h5 className="ml-3 font-bold">
                  {activeConversation.participant?.name}
                </h5>
              </div>

              <div
                ref={messagesContainerRef}
                className="flex-1 p-4 overflow-y-auto"
              >
                {messages.map((message, index) => {
                  if (!message || !message.sender || !message.receiver) {
                    return null;
                  }

                  const time = message.created_at
                    ? new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A";

                  const isUserSender = message.sender.id === user?.id;

                  return isUserSender ? (
                    <MessageLeft
                      key={index}
                      avatar={message.sender?.avatar || "/default-avatar.jpg"}
                      naame={message.sender?.name || "Unknown"}
                      time={time}
                      text={message.message || ""}
                    />
                  ) : (
                    <MessageRight
                      key={index}
                      avatar={message.sender?.avatar || "/default-avatar.jpg"}
                      naame={message.sender?.name || "Unknown"}
                      time={time}
                      text={message.message || ""}
                    />
                  );
                })}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f97316] text-white rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatToggle;
