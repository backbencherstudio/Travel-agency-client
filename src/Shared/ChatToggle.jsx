import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import MessageRight from "../Components/Dashboard/chat/Components/MessageLeft";
import MessageLeft from "../Components/Dashboard/chat/Components/MessageRight";
import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import ChatApis from "../Apis/ChatApis";
import { io } from "socket.io-client";
import NotificationManager from "./NotificationManager";
const defaultAvatar = "https://via.placeholder.com/150";


const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: token,
  },
});

socket.on("connect", () => {
  console.log("Connected to server!");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

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
  
  // Request notification permission on component mount
  useEffect(() => {
    NotificationManager.requestPermission();
  }, []);

  // Socket event listener for new messages
  useEffect(() => {
    socket.on("message", (data) => {
      console.log("New message received:", data.data);
      
      // Show notification only when chat is closed and message is from others
      if (data.data.sender.id !== user.id && !isOpen) {
        NotificationManager.showNotification({
          title: "New Message from Admin",
          body: `Admin: ${data.data.message}`,
          icon: data.data.sender.avatar || defaultAvatar,
          requireInteraction: false,
          onClick: () => {
            window.focus();
            setIsOpen(true);
            if (data.data.conversation_id) {
              const conversation = conversations.find(conv => conv.id === data.data.conversation_id);
              if (conversation) {
                setActiveConversation(conversation);
              }
            }
          }
        });
      }

      // Only update messages if it belongs to current conversation
      if (activeConversation && data.data.conversation_id === activeConversation.id) {
        setMessages((prevMessages) => {
          const prevMessagesArray = Array.isArray(prevMessages) ? prevMessages : [];
          const messageExists = prevMessagesArray.some(
            (msg) =>
              msg.created_at === data.data.created_at &&
              msg.message === data.data.message &&
              msg.sender.id === data.data.sender.id
          );
          if (messageExists) return prevMessagesArray;
          return [...prevMessagesArray, data.data];
        });
      }
    });
    console.log('messages', messages);
    
    

    return () => {
      socket.off("message");
    };
  }, [activeConversation,  conversations, isOpen]);

  const fetchConversations = async () => {
    try {
      const response = await ChatApis.fetchConversations();
      console.log('conversations response', response);
      
      setConversations(response);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const response = await axiosClient.get("/api/chat/user");
      const admins = response.data.data.filter((user) => user.type === "admin");
      console.log('admins', admins);
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
  console.log('fetching messages', messages);
  

  const handleAdminClick = async (admin) => {
    // Check if conversation exists
    const existingConversation = conversations.find(
      (conv) => 
        (conv.creator_id === user.id && conv.participant_id === admin.id) ||
        (conv.creator_id === admin.id && conv.participant_id === user.id)
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

      const newConversation = {
        ...response.data.data,
        participant: {
          id: admin.id,
          name: admin.name,
          avatar_url: admin.avatar
        }
      };

      setActiveConversation(newConversation);
      setConversations([...conversations, newConversation]);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // Fetch messages when conversation changes
  useEffect(() => {
    fetchMessages();
    console.log('fetching messages', messages);
    
  }, [activeConversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const receiverId = activeConversation.participant_id === user.id 
        ? activeConversation.creator_id 
        : activeConversation.participant_id;

      const messagePayload = {
        conversation_id: activeConversation.id,
        receiver_id: receiverId,
        message: newMessage,
        sender_id: user.id,
        sender_name: user.name,
        sender_avatar: user.avatar_url,
        receiver_name: activeConversation.participant?.name,
        receiver_avatar: activeConversation.participant?.avatar_url,
      };

      // Add message to local state immediately
      const newMsg = {
        message: newMessage,
        conversation_id: activeConversation.id,
        sender: {
          id: user.id,
          name: user.name,
          avatar: user.avatar_url,
        },
        receiver: {
          id: receiverId,
          name: activeConversation.participant?.name,
          avatar: activeConversation.participant?.avatar_url,
        },
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMsg]);

      // Send to API
      await ChatApis.sendMessage(messagePayload);

      // Emit socket event with conversation details
      socket.emit("sendMessage", {
        to: messagePayload.receiver_id,
        data: newMsg,
      });

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
                    {admin.avatar ? (
                      <img
                        src={admin.avatar}
                        className="rounded-full h-10 w-10 object-cover"
                        alt={admin.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`rounded-full h-10 w-10 bg-gray-200 text-gray-600 flex items-center justify-center ${
                        admin.avatar ? 'hidden' : ''
                      }`}
                    >
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
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
                    defaultAvatar
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
                      avatar={message.sender?.avatar || defaultAvatar}
                      naame={message.sender?.name || "Unknown"}
                      time={time}
                      text={message.message || ""}
                    />
                  ) : (
                    <MessageRight
                      key={index}
                      avatar={message.sender?.avatar || defaultAvatar}
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
