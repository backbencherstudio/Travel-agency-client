import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { FaSearch } from "react-icons/fa";
import MessageLeft from "./Components/MessageLeft";
import MessageRight from "./Components/MessageRight";
import User from "./Components/User";
import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../../../axiosClient";
import ChatApis from "../../../Apis/ChatApis";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { io } from "socket.io-client";
import NotificationManager from "../../../Shared/NotificationManager";
const defaultAvatar = "https://via.placeholder.com/150";

const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: token
  }
});

socket.on("connect", () => {
  console.log("Connected to server!");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

const Chat = () => {
  const [usersData, setUsersData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isInDashboard, setIsInDashboard] = useState(true);

  const { conversationID } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Check if user is in dashboard
  useEffect(() => {
    const checkLocation = () => {
      const path = window.location.pathname;
      setIsInDashboard(path.includes('/dashboard/chat'));
    };

    // Initial check
    checkLocation();

    // Check on visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsInDashboard(false);
      } else {
        checkLocation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', checkLocation);
    window.addEventListener('focus', checkLocation);
    window.addEventListener('blur', () => setIsInDashboard(false));

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', checkLocation);
      window.removeEventListener('focus', checkLocation);
      window.removeEventListener('blur', () => setIsInDashboard(false));
    };
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await ChatApis.fetchConversations();
      const conversationsWithUnread = data.map(conv => ({
        ...conv,
        unread: conv.unread || false
      }));
      setUsersData(conversationsWithUnread);

      if (conversationID && data.length > 0) {
        const selectedConversation = data.find((conv) => conv.id === conversationID);
        if (selectedConversation) setActiveConversation(selectedConversation);
      } else {
        setActiveConversation(data[0]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async () => {
    if (!activeConversation) return;

    setIsLoadingMessages(true);
    try {
      const response = await axiosClient.get(
        `/api/chat/message?conversation_id=${activeConversation.id}`
      );
      setMessageData(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Fetch Conversations
  useEffect(() => {
    fetchConversations();

    socket.on("conversation", (data) => {
      const newConversation = data.conversation;
      setUsersData(prevUsers => {
        const exists = prevUsers.some(conv => conv.id === newConversation.id);
        if (exists) {
          return prevUsers.map(conv => 
            conv.id === newConversation.id ? {...newConversation, unread: conv.unread} : conv
          );
        }
        return [{...newConversation, unread: true}, ...prevUsers];
      });
    });

    return () => {
      socket.off("conversation");
    };
  }, [conversationID]);

  // Fetch Messages and Handle New Messages
  useEffect(() => {
    fetchMessages();
    
    const handleNewMessage = (data) => {
      // Show notification only when sender is not the current user and user is not in dashboard
      if (data.data.sender.id !== user.id && !isInDashboard && document.hidden) {
        NotificationManager.showNotification({
          title: data.data.sender.name,
          body: data.data.message,
          icon: data.data.sender.avatar_url || defaultAvatar,
          requireInteraction: true,
          onClick: () => {
            window.focus();
            navigate('/dashboard/chat');
            if (data.data.conversation_id) {
              navigate(`/dashboard/chat/${data.data.conversation_id}`);
            }
          }
        });
      }

      // Update messages if they belong to active conversation
      if (data.data.conversation_id === activeConversation?.id) {
        setMessageData(prevMessages => {
          const prevMessagesArray = Array.isArray(prevMessages) ? prevMessages : [];
          const messageExists = prevMessagesArray.some(msg => 
            msg.created_at === data.data.created_at && 
            msg.message === data.data.message &&
            msg.sender.id === data.data.sender.id
          );
          if (messageExists) return prevMessagesArray;
          return [...prevMessagesArray, data.data];
        });
      }

      // Update conversation list and mark as unread
      setUsersData(prevUsers => {
        return prevUsers.map(conv => {
          if (conv.id === data.data.conversation_id) {
            const shouldMarkUnread = conv.id !== activeConversation?.id;
            return {
              ...conv,
              messages: [{ message: data.data.message }, ...(conv.messages || [])],
              unread: shouldMarkUnread || conv.unread
            };
          }
          return conv;
        });
      });
    };
    
    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [activeConversation, user.id, navigate, isInDashboard]);

  // Request notification permission
  useEffect(() => {
    NotificationManager.requestPermission();
  }, []);

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
    setUsersData(prevUsers => {
      return prevUsers.map(conv => {
        if (conv.id === conversation.id) {
          return { ...conv, unread: false };
        }
        return conv;
      });
    });
    navigate(`/dashboard/chat/${conversation.id}`, { replace: true });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const messagePayload = {
        conversation_id: activeConversation.id,
        receiver_id: user.id === activeConversation.participant_id
          ? activeConversation.creator.id
          : activeConversation.participant.id,
        message: newMessage,
        sender_id: user.id,
        sender_name: user.name,
        sender_avatar: user.avatar_url,
        receiver_name: user.id === activeConversation.participant_id
          ? activeConversation.creator.name
          : activeConversation.participant.name,
        receiver_avatar: user.id === activeConversation.participant_id
          ? activeConversation.creator.avatar_url
          : activeConversation.participant.avatar_url
      };

      const newMsg = {
        message: newMessage,
        conversation_id: activeConversation.id,
        sender: {
          id: user.id,
          name: user.name,
          avatar: user.avatar_url
        },
        receiver: {
          id: messagePayload.receiver_id,
          name: messagePayload.receiver_name,
          avatar: messagePayload.receiver_avatar
        },
        created_at: new Date().toISOString(),
      };

      setMessageData(prev => {
        const prevMessages = Array.isArray(prev) ? prev : [];
        return [...prevMessages, newMsg];
      });

      setUsersData(prevUsers => {
        return prevUsers.map(conv => {
          if (conv.id === activeConversation.id) {
            return {
              ...conv,
              messages: [{ message: newMessage }, ...(conv.messages || [])]
            };
          }
          return conv;
        });
      });

      await ChatApis.sendMessage(messagePayload);
      socket.emit("sendMessage", { to: messagePayload.receiver_id, data: newMsg });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [activeConversation, messageData]);

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
                        className={`cursor-pointer p-4 ${activeConversation?.id === data.id
                          ? "bg-gray-100"
                          : ""
                          }`}
                      >
                        <User
                          active={activeConversation?.id === data.id}
                          id={chatUser.id}
                          image={chatUser.avatar_url || defaultAvatar}
                          name={chatUser.name}
                          hint={data.unread ? <strong>{lastMessage}</strong> : lastMessage}
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
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={messagesContainerRef} className="h-[73vh] p-4 lg:p-6 overflow-y-auto">
            {isLoadingMessages ? (
              <p className="text-center text-gray-500">Loading messages...</p>
            ) : messageData?.length > 0 ? (
              messageData.map((data, index) => {
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

            {/* Add a dummy div at the end to scroll into view */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#dddddd] bg-[#f2f2f2]/100 absolute bottom-0 right-0 w-full">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center bg-[#eb5a2a20] rounded px-4 py-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
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