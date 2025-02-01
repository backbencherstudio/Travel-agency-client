// Import necessary dependencies and components
import { IoChatbubbleEllipsesSharp, IoClose } from "react-icons/io5";
import MessageRight from "../Components/Dashboard/chat/Components/MessageLeft";
import MessageLeft from "../Components/Dashboard/chat/Components/MessageRight";
import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import ChatApis from "../Apis/ChatApis";
import { io } from "socket.io-client";
import NotificationManager from "./NotificationManager";

// Define constants for default values
const defaultAvatar = "https://via.placeholder.com/150";
import { MdKeyboardArrowLeft } from "react-icons/md";


const ChatToggle = () => {

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([]);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const { user } = useContext(AuthContext);



  // Fetch list of conversations
  const fetchConversations = async () => {
    try {
      const response = await ChatApis.fetchConversations();

      setConversations(response);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // Fetch list of admin users
  const fetchAdminUsers = async () => {
    try {
      const response = await axiosClient.get("/api/chat/user");
      const admins = response.data.data.filter((user) => user.type === "admin");
      setAdminUsers(admins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  // Fetch messages for the active conversation
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


  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || !socket || !isConnected) return;

    try {
      const receiverId =
        activeConversation.participant_id === user.id
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


  // Handle click on admin to initiate or continue conversation
  const handleAdminClick = async (admin) => {
    // Check if conversation exists
    const existingConversation = conversations && conversations.find(
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
          avatar_url: admin.avatar,
        },
      };

      setActiveConversation(newConversation);
      setConversations([...conversations, newConversation]);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Initialize socket connection
  useEffect(() => {
    if (!user?.id) return;

    const token = localStorage.getItem("token");
    const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      transports: ['websocket']
    });

    newSocket.on("connect", () => {
      console.log("client socket connected with user id", user.id);
      setIsConnected(true);
      newSocket.emit("joinRoom", { room_id: user.id });
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Attempting to reconnect...");
        newSocket.connect();
      }, 5000);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.off("connect_error");
      newSocket.close();
    };
  }, [user?.id]);


  // Message listener
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      if (!data?.data) return;

      if (data.data.sender.id !== user.id && document.hidden) {
        NotificationManager.showNotification({
          title: "New Message from Admin",
          body: `Admin: ${data.data.message}`,
          icon: data.data.sender.avatar || defaultAvatar,
          requireInteraction: false,
          onClick: () => {
            window.focus();
            setIsOpen(true);
            if (data.data.conversation_id) {
              const conversation = conversations.find(
                (conv) => conv.id === data.data.conversation_id
              );
              if (conversation) {
                setActiveConversation(conversation);
              }
            }
          },
        });
      }

      if (activeConversation && data.data.conversation_id === activeConversation.id) {
        setMessages(prevMessages => {
          const prevMessagesArray = Array.isArray(prevMessages) ? prevMessages : [];
          const messageExists = prevMessagesArray.some(
            msg =>
              msg.created_at === data.data.created_at &&
              msg.message === data.data.message &&
              msg.sender.id === data.data.sender.id
          );
          if (messageExists) return prevMessagesArray;
          return [...prevMessagesArray, data.data];
        });
      }
    };

    socket.on("message", handleNewMessage);

    return () => socket.off("message", handleNewMessage);
  }, [socket, activeConversation, conversations, isOpen, user?.id]);



  // Initial data fetch
  useEffect(() => {
    if (user?.id) {
      NotificationManager.requestPermission();
      fetchConversations();
      fetchAdminUsers();
    }
  }, [user?.id]);

  // Fetch messages when conversation changes
  useEffect(() => {
    fetchMessages();
  }, [activeConversation]);


  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [activeConversation, messages]);

  return (
    // Container for the Chat Toggle
    <div className="fixed bottom-[5%] md:bottom-[8%] lg:bottom-[11%] right-[3%] z-50">
      {
        user && user.type === 'user' &&
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-[#f974164b] text-[#f97316] rounded-full shadow-lg transition hover:bg-[#f97316] hover:text-[#f2f2f2]"
        >
          <IoChatbubbleEllipsesSharp className="h-8 w-8" />
        </button>
      }

      {isOpen && (
        <div className="fixed bottom-[12%] md:bottom-[15%] lg:bottom-[18%] right-[3%] w-[85vw] sm:w-[460px] h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden">
          {!activeConversation ? (
            <div className="p-4">

              {/* conversation list start */}

              <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold mb-4">Conversations</h5>


                {/* Close Button Added Here */}
                <div className="col-span-4 sm:col-span-8 flex justify-end transi">
                  <button
                    onClick={() => setIsOpen(false)} // Chatbox will close onClick
                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none transi"
                    aria-label="Close Chat"
                  >
                    <IoClose className="h-8 w-8" />
                  </button>
                </div>
              </div>

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
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`rounded-full h-10 w-10 bg-gray-200 text-gray-600 flex items-center justify-center ${admin.avatar ? "hidden" : ""
                        }`}
                    >
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h6 className="font-medium">{admin.name}</h6>
                      <p className="text-sm text-gray-500">
                        {conversations && conversations.length > 0 && conversations.some(
                          (conv) => conv.admin?.id === admin.id
                        )
                          ? "Continue chat"
                          : "Start new chat"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* conversation list end */}

            </div>
          ) : (
            <div className="flex flex-col h-full">

              <div className="p-4 bg-gray-100 flex items-center justify-between ">

                <div className="flex items-center justify-center">


                  <button
                    onClick={() => setActiveConversation(null)}
                    className="mr-4 px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    <MdKeyboardArrowLeft className="h-5 w-5" />
                  </button>


                  <div className="relative">
                    <img
                      src={activeConversation.participant?.avatar || ""}
                      className="rounded-full h-8 w-8 object-cover"
                      alt={activeConversation.participant?.name}
                      onError={(e) => {
                        e.target.style.display = "none"; // Hide the broken image
                        e.target.nextElementSibling.style.display = "flex"; // Show the fallback
                      }}
                    />
                    <div className="rounded-full h-9 w-9 bg-gray-200 text-gray-600 flex items-center justify-center ">
                      {activeConversation.participant?.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  </div>

                  <h5 className="ml-3 font-bold">
                    {activeConversation.participant?.name}
                  </h5>
                </div>


                {/* Close Button Added Here */}
                <div className="  ">
                  <button
                    onClick={() => setIsOpen(false)} // Chatbox will close onClick
                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none transi"
                    aria-label="Close Chat"
                  >
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>


              </div>

              <div
                ref={messagesContainerRef}
                className="h-[73vh] p-4 lg:p-6 overflow-y-auto"
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

                <div className="w-[100%] gap-2 grid grid-cols-12 grid-flow-col ">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="col-span-9 px-4 py-2 border rounded-lg"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="col-span-3 px-4 py-2 bg-[#f97316] text-white rounded-lg"
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
