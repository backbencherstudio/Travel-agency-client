import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import MessageRight from "../Components/Dashboard/chat/Components/MessageLeft";
import MessageLeft from "../Components/Dashboard/chat/Components/MessageRight";
import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { io } from "socket.io-client";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";

const myToken = localStorage.getItem("token");
const socket = io("http://192.168.10.159:4000", {
  extraHeaders: {
    authorization: `Bearer ${myToken || ""}`,
  },
});
// console.log("new socket:", newSocket);

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

  // Socket.IO setup
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("message", (newMessage) => {
      console.log(newMessage);

      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.close();
    };
  }, []);

  // Room management for active conversation
  // useEffect(() => {
  //   if (socket && activeConversation) {
  //     if (socket.activeRoom) {
  //       socket.emit("leave_room", socket.activeRoom);
  //     }

  //     const roomId = `conversation_${activeConversation.id}`;

  //     socket.emit("joinRoom", roomId);
  //     socket.activeRoom = roomId;
  //   }
  // }, [socket, activeConversation]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosClient.get("/api/chat/conversation");
        // console.log("fetch conversation", response);

        setConversations(response.data.data);
      } catch (error) {
        // console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Fetch admin users
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axiosClient.get("/api/chat/user");
        const admins = response.data.data.filter(
          (user) => user.type === "admin"
        );
        setAdminUsers(admins);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };
    fetchAdminUsers();
  }, []);

  // Fetch messages for active conversation
  // useEffect(() => {
  //   if (activeConversation) {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await axiosClient.get(
  //           `/api/chat/message?conversation_id=${activeConversation.id}`
  //         );

  //         setMessages(response.data.data || []);
  //       } catch (error) {
  //         console.error("Error fetching messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }
  // }, [activeConversation]);
  // console.log("fetch msg:", messages);

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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (message) => {
      console.log("message", message);
      // if(sendMessage.conversation_id === conversation_id){
      //   sendMessage((state) => [...state, message])
      // }
    });
  }, []);
  // console.log('setMessage:', messages);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const messagePayload = {
        conversation_id: activeConversation.id,
        receiver_id: activeConversation.participant_id,
        message: newMessage,
        // sender: user,
        // created_at: new Date().toISOString(),
      };

      // Emit the message through socket
      socket.emit("sendMessage", {
        to: activeConversation.participant_id,
        data: {
          receiver_id: activeConversation.participant_id,
          conversation_id: activeConversation.id,
          message: newMessage,
        },
      });

      const response = await axiosClient.post(
        "/api/chat/message",
        messagePayload
      );
      // console.log("send msg:", response.data);

      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  // console.log("send message:", messages);

  // Auto scroll message
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [activeConversation, messages]);

  // Typing indicator functionality
  const handleTyping = () => {
    if (socket && activeConversation) {
      socket.emit("typing", {
        room: `conversation_${activeConversation.id}`,
        user: user.name,
      });
    }
  };

  // Listen for typing events
  useEffect(() => {
    if (socket) {
      socket.on("user_typing", (data) => {
        // Handle typing indicator display
        // console.log(`${data.user} is typing...`);
      });
    }
  }, [socket]);

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
                    <MessageRight
                      key={index}
                      avatar={
                        message?.receiver?.avatar || "/default-avatar.jpg"
                      }
                      naame={message.receiver?.name || "Unknown"}
                      time={time}
                      text={message.message || ""}
                    />
                  ) : (
                    <MessageLeft
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
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
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
