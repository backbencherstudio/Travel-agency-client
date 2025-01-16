import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { FaSearch } from "react-icons/fa";
import MessageLeft from "./Components/MessageLeft";
import MessageRight from "./Components/MessageRight";
import User from "./Components/User";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import ChatApis from "../../../Apis/ChatApis";
import { io } from "socket.io-client";
const defaultAvatar = "https://via.placeholder.com/150";

const Chat = () => {
  const [usersData, setUsersData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const { conversationID } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Socket.IO Connection
  // useEffect(() => {
  //   // Initialize socket connection
  //   const newSocket = io(axiosClient.get("/api/chat/conversation"), {
  //     auth: {
  //       token: localStorage.getItem("token") // Assuming you store token in localStorage
  //     }
  //   });

  //   // Connection event handlers
  //   newSocket.on("connect", () => {
  //     console.log("Connected to socket server");
  //   });

  //   newSocket.on("disconnect", () => {
  //     console.log("Disconnected from socket server");
  //   });

  //   // Listen for new messages
  //   newSocket.on("newMessage", (message) => {
  //     setMessageData(prevMessages => [...prevMessages, message]);
  //   });

  //   // Listen for typing status
  //   newSocket.on("userTyping", ({ userName, isTyping }) => {
  //     setTypingUser(userName);
  //     setIsTyping(isTyping);
      
  //     // Clear typing indicator after 3 seconds
  //     setTimeout(() => {
  //       setIsTyping(false);
  //     }, 3000);
  //   });

  //   setSocket(newSocket);

  //   // Cleanup on unmount
  //   return () => {
  //     if (newSocket) newSocket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    // Replace this with your actual backend WebSocket URL
    const newSocket = io("https://travel-agency-backend-rh1v.onrender.com", {
      auth: {
        token: localStorage.getItem("token"), // Assuming you use token-based authentication
      },
    });
    console.log('new socket:', newSocket);
    
  
    // Handle connection events
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });
  
    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  
    // Listen for new messages
    newSocket.on("newMessage", (message) => {
      setMessageData((prevMessages) => [...prevMessages, message]);
    });
  
    // Listen for typing status
    newSocket.on("userTyping", ({ userName, isTyping }) => {
      setTypingUser(userName);
      setIsTyping(isTyping);
  
      // Clear typing indicator after 3 seconds
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    });
  
    // Set the socket instance in state
    setSocket(newSocket);
  
    // Cleanup on component unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);
  

  // Join conversation room when active conversation changes
  useEffect(() => {
    if (socket && activeConversation) {
      socket.emit("joinRoom", activeConversation.id);
    }
  }, [socket, activeConversation]);

  // Fetch Conversations
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosClient.get("/api/chat/conversation");
        const data = response.data.data;
        setUsersData(data);

        if (conversationID && data.length > 0) {
          const selectedConversation = data.find(
            (conversation) => conversation.id === conversationID
          );
          if (selectedConversation) {
            setActiveConversation(selectedConversation);
          }
        }
      } catch (error) {
        console.error("Error fetching conversation data:", error);
      }
    };

    fetchConversation();
  }, [conversationID]);

  // Fetch Messages for Active Conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeConversation) return;
      
      setIsLoadingMessages(true);
      try {
        const messages = await ChatApis.fetchMessages(activeConversation.id);
        setMessageData(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [activeConversation]);

  // Handle Conversation Click
  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
    navigate(`/dashboard/chat/${conversation.id}`, { replace: true });
  };

  // Typing Handler
  const handleTyping = () => {
    if (socket && activeConversation) {
      socket.emit("typing", {
        conversationId: activeConversation.id,
        userId: user.id,
        userName: user.name,
        isTyping: true
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;
  
    const messagePayload = {
      message: newMessage,
      conversation_id: activeConversation.id,
      sender_id: user.id,
      receiver_id:
        user.id === activeConversation.participant_id
          ? activeConversation.creator.id
          : activeConversation.participant.id,
    };
  
    try {
      // Emit message through socket for real-time updates
      if (socket) {
        socket.emit("sendMessage", messagePayload);
      }
  
      // Save message through API
      const response = await ChatApis.sendMessage(messagePayload);
      if (response && response.message) {
        // Update local state immediately
        setMessageData((prevMessages) => [
          ...(prevMessages || []),
          { ...response.message, sender: user },
        ]);
        setNewMessage(""); // Clear input
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Chat Left Sidebar */}
      <div className="chat-leftsidebar lg:w-auto shadow col-span-12 overflow-y-hidden border-none sm:col-span-4">
        <div className="bg-[#f2f2f2] overflow-y-auto h-[87.9vh]">
          <div className="px-6 pt-6">
            <h4 className="mb-0 text-gray-700">Chats</h4>
            
            {/* Search Bar */}
            <div className="w-full max-w-sm min-w-full my-3 p-2 rounded-md bg-[#eb5a2a20]">
              <div className="relative w-full">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-1 outline-none border-none bg-transparent placeholder:text-slate-400 text-slate-600 text-sm rounded-md"
                  placeholder="Search conversations..."
                />
              </div>
            </div>
          </div>

          {/* Conversation List */}
          <div className="px-6">
            <h5 className="mb-4 text-xl">Recent</h5>
            <div className="h-full" data-simplebar>
              <ul className="chat-user-list">
                {usersData.length === 0 ? (
                  <p className="text-gray-500 p-4">No conversations found</p>
                ) : (
                  usersData.map((data, index) => {
                    const chatUser =
                      user.id === data.participant_id
                        ? data.creator
                        : data.participant;
                    const lastMessage =
                      data.messages?.[0]?.message || "No recent messages";

                    return (
                      <li
                        key={index}
                        onClick={() => handleConversationClick(data)}
                        className={`cursor-pointer p-4 ${
                          activeConversation?.id === data.id
                            ? "bg-gray-100"
                            : ""
                        }`}
                      >
                        <User
                          active={activeConversation?.id === data.id}
                          id={chatUser.id}
                          image={chatUser.avatar_url || defaultAvatar}
                          name={chatUser.name}
                          hint={lastMessage}
                          time={data.updated_at
                            ? new Date(data.updated_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "N/A"
                          }
                        />
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Content Area */}
      {activeConversation ? (
        <div className="w-full h-[87.9vh] relative overflow-hidden bg-white user-chat sm:col-span-8 shadow hidden sm:block">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <img
                src={user.id === activeConversation.participant_id
                  ? activeConversation.creator.avatar_url || defaultAvatar
                  : activeConversation.participant.avatar_url || defaultAvatar
                }
                className="rounded-full h-9 w-9"
                alt="User Avatar"
              />
              <div className="ml-3">
                <h5 className="text-gray-800 font-bold text-lg">
                  {user.id === activeConversation.participant_id
                    ? activeConversation.creator.name
                    : activeConversation.participant.name}
                </h5>
                {isTyping && (
                  <p className="text-sm text-gray-500">{typingUser} is typing...</p>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[73vh] p-4 lg:p-6 overflow-y-auto">
            {isLoadingMessages ? (
              <p className="text-center text-gray-500">Loading messages...</p>
            ) : messageData?.length > 0 ? (
              messageData
                .filter(data =>
                  data.sender?.id === activeConversation?.creator?.id ||
                  data.sender?.id === activeConversation?.participant_id ||
                  data.receiver?.id === activeConversation?.creator?.id ||
                  data.receiver?.id === activeConversation?.participant_id
                )
                .map((data, index) => {
                  const time = data.created_at
                    ? new Date(data.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A";

                  const isUserSender = data.sender?.id === user?.id;

                  return isUserSender ? (
                    <MessageRight
                      key={index}
                      avatar={data.sender?.avatar_url || defaultAvatar}
                      naame={data.sender?.name || "Unknown"}
                      time={time}
                      text={data?.message}
                    />
                  ) : (
                    <MessageLeft
                      key={index}
                      avatar={data.sender?.avatar_url || defaultAvatar}
                      naame={data.sender?.name || "Unknown"}
                      time={time}
                      text={data?.message}
                    />
                  );
                })
            ) : (
              <p className="text-center text-gray-500">No messages in this conversation.</p>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#dddddd] bg-[#f2f2f2]/100 absolute bottom-0 right-0 w-full">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center bg-[#eb5a2a20] rounded px-4 py-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none focus:outline-none text-sm"
                  placeholder="Type your message..."
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center -rotate-45 h-10 w-10 rounded-full bg-gray-200 hover:bg-[#eb5a2a20] text-[#eb5b2a]"
              >
                <svg
                  className="w-5 h-5 transform rotate-90 -mr-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[87.9vh] flex items-center justify-center bg-white sm:col-span-8 shadow hidden sm:block">
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Chat;