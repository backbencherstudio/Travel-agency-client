import { useParams } from "react-router-dom";
import "./style.css";
import { FaSearch } from "react-icons/fa";
import MessageLeft from "./Components/MessageLeft";
import MessageRight from "./Components/MessageRight";
import User from "./Components/User";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Chat = () => {
  const [usersData, setUsersData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  // console.log("activeConversation:", activeConversation);

  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const { conversationID } = useParams();
  // console.log("conversationId:", conversationID);

  const { user } = useContext(AuthContext);
  // console.log("user", user);

  // // API call inside useEffect
  // useEffect(() => {
  //   const fetchConversation = async () => {
  //     try {
  //       const response = await axiosClient.get("/api/chat/conversation");
  //       const data = response.data.data;
  //       setUsersData(data);
  //       // console.log("conversation Data:", usersData);
  //     } catch (error) {
  //       console.error("Error fetching conversation data:", error);
  //     }
  //   };

  //   fetchConversation(); // Call the fetch function
  // }, []); // Empty dependency array to run only once on mount
 
  // console.log("data", usersData);

  // Handle initial URL conversation and updates
useEffect(() => {
  const fetchConversation = async () => {
    try {
      const response = await axiosClient.get("/api/chat/conversation");
      const data = response.data.data;
      setUsersData(data);
      
      // If URL has conversationID, set that conversation as active
      if (conversationID && data?.length > 0) {
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
}, [conversationID]); // Depend on conversationID

// Handle conversation click
const handleConversationClick = (conversation) => {
  setActiveConversation(conversation);
  navigate(`/chat/${conversation.id}`);
};

  
  // Update message fetching useEffect
useEffect(() => {
  const fetchMessage = async () => {
    if (!activeConversation?.id) return; // Don't fetch if no active conversation

    try {
      const response = await axiosClient.get(`/api/chat/message?conversation_id=${activeConversation.id}`);
      const data = response.data.data;
      setMessageData(data);
    } catch (error) {
      console.error("Error fetching message data:", error);
    }
  };

  fetchMessage();
}, [activeConversation?.id]); // Dependency on activeConversation.id


  // // API call inside useEffect
  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       const response = await axiosClient.get("/api/chat/message");
  //       const data = response.data.data;
  //       // console.log("msg data:", data);
        
  //       setMessageData(data);
        
        
  //     } catch (error) {
  //       console.error("Error fetching conversation data:", error);
  //     }
  //   };
    
  //   fetchMessage();
  // }, []);
  // console.log("Fetched messageData:", messageData);

  
  // Set active conversation when usersData and conversationID are available
  // useEffect(() => {
  //   if (conversationID && usersData.length > 0) {
  //     const selectedConversation = usersData.find(
  //       (conversation) => conversation.id === conversationID
  //     );

  //     if (selectedConversation) {
  //       setActiveConversation(selectedConversation);
  //       console.log("Active Conversation:", selectedConversation);
  //     } else {
  //       console.warn("No conversation found for this ID.");
  //       setActiveConversation(null);
  //     }
  //   }
  // }, [conversationID, usersData]);

  // const handleConversationClick = (conversation) => {
  //   setActiveConversation(conversation); // Set active conversation
  //   navigate(`/chat/${conversation.id}`); // Navigate to the selected conversation URL
  // };

// Remove these useEffect hooks that were handling route-based navigation
useEffect(() => {
  if (conversationID && usersData?.length > 0) {
    const selectedConversation = usersData.find(
      (conversation) => conversation.id === conversationID
    );

    if (selectedConversation) {
      setActiveConversation(selectedConversation);
    }
  }
}, [conversationID, usersData]);

  // const handleConversationClick = (conversation) => {
  //   setActiveConversation(conversation); // Just set the active conversation
  // };

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {/* Start Chat Left Sidebar */}
        <div className="chat-leftsidebar lg:w-auto shadow col-span-12 overflow-y-hidden border-none sm:col-span-4 ">
          <div>
            <div className="tab-content">
              {/* Start Chat Content */}
              <div className="bg-[#f2f2f2] overflow-y-auto h-[87.9vh]">
                <div className="px-6 pt-6">
                  <h4 className="mb-0 text-gray-700">Chats</h4>

                  {/* Search Bar */}
                  <div className="w-full max-w-sm min-w-full my-3 p-2 rounded-md bg-[#eb5a2a20]">
                    <div className="relative w-full">
                      {/* Search Icon on the Left */}
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />

                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-1 outline-none border-none bg-transparent placeholder:text-slate-400 text-slate-600 text-sm rounded-md transition duration-300 ease"
                        placeholder="Type here..."
                      />
                    </div>
                  </div>
                </div>
                {/* Search Bar Ends */}

                {/* Start Chat people Message List */}
                <div>
                  <h5 className="px-6 mb-4 text-xl">Recent</h5>

                  {/* Scrollable Chat List */}
                  <div className="h-full px-2 " data-simplebar>
                    <ul className="chat-user-list">
                      {usersData?.length === 0 ? (
                        <p>Loading conversations...</p>
                      ) : (
                        <ul className="chat-user-list">
                          {usersData.map((data, index) => {
                            const chatUser =
                              user.id === data.participant_id
                                ? data.creator
                                : data.participant;
                            const lastMessage =
                              data.messages?.[0]?.message ||
                              "No recent messages";

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
                                  image={
                                    chatUser.avatar_url ||
                                    "https://via.placeholder.com/150"
                                  }
                                  name={chatUser.name}
                                  hint={lastMessage}
                                  time={
                                    data.updated_at
                                      ? new Date(
                                          data.updated_at
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : "N/A"
                                  }
                                />
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </ul>
                  </div>
                </div>
                {/* End Chat people Message List */}
              </div>
              {/* End Chat Content */}
            </div>
          </div>
        </div>
        {/* End Chat Left Sidebar */}

        <>
          {activeConversation ? (
            <div className="w-full h-[87.9vh] relative overflow-hidden transition-all duration-150 bg-white user-chat sm:col-span-8 shadow hidden sm:block ">
              <div className="lg:flex">
                {/* Start Chat Conversation Section */}
                <div className="relative w-full">
                  {/* Start Chat User Header */}
                  <div className="p-4 border-b border-gray-100 lg:py-4 lg:px-6">
                    <div className="grid items-center grid-cols-12">
                      <div className="col-span-8 sm:col-span-4">
                        <div className="flex items-center">
                          <div className="ltr:mr-3">
                            <img
                              src={
                                activeConversation
                                  ? user.id ===
                                    activeConversation.participant_id
                                    ? activeConversation.creator.avatar_url ||
                                      "https://via.placeholder.com/150"
                                    : activeConversation.participant
                                        .avatar_url ||
                                      "https://via.placeholder.com/150"
                                  : "https://via.placeholder.com/150"
                              }
                              className="rounded-full h-9 w-9"
                              alt="User Avatar"
                            />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 truncate ltr:block">
                              <span className="text-gray-800 pl-4 font-bold text-lg">
                                {/* conversation selected user name and image*/}
                                {activeConversation
                                  ? user.id ===
                                    activeConversation.participant_id
                                    ? activeConversation.creator.name
                                    : activeConversation.participant.name
                                  : "Select a conversation"}
                              </span>
                              <i className="text-gray-100 ltr:ml-1 rtl:mr-1 ri-record-circle-fill"></i>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Chat User Header */}

                  {/* Start Chat Conversation */}
                  <div
                    className="h-[73vh] p-4 lg:p-6 overflow-y-auto "
                    data-simplebar
                  >
                    {/* Message list */}
                    <div className="h-[73vh] p-4 lg:p-6 overflow-y-auto">
                      {messageData?.length > 0 ? (
                        messageData
                        .filter(
                          (data) =>
                            data.sender?.id === activeConversation?.creator?.id || 
                            data.sender?.id === activeConversation?.participant_id ||
                            data.receiver?.id === activeConversation?.creator?.id ||
                            data.receiver?.id === activeConversation?.participant_id
                        )
                          .map((data, index) => {
                            const time = data.created_at
                              ? new Date(data.created_at).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "N/A";

                            if (data.receiver.id === user.id) {
                              return (
                                <MessageRight
                                  key={index}
                                  avatar={
                                    data.participant?.avatar_url ||
                                    "https://via.placeholder.com/150"
                                  }
                                  naame={data.participant?.name || "Unknown"}
                                  time={time}
                                  text={data.message}
                                />
                              );
                            } else {
                              return (
                                <MessageLeft
                                  key={index}
                                  avatar={
                                    data.sender?.avatar_url ||
                                    "https://via.placeholder.com/150"
                                  }
                                  naame={data.sender?.name || "Unknown"}
                                  time={time}
                                  text={data.message}
                                />
                              );
                            }
                          })
                      ) : (
                        <p className="text-gray-500">
                          No messages in this conversation.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* End Chat Conversation */}
                </div>

                {/* Start Chat Input Section */}
                <div className="p-4 border-t border-[#dddddd] bg-[#f2f2f2]/100 absolute bottom-0 right-0 w-full">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center bg-[#eb5a2a20] rounded px-4 py-2">
                      <input
                        type="text"
                        className="w-full bg-transparent border-none focus:outline-none text-sm"
                        placeholder="Type your message...."
                      />
                    </div>
                    <button className="flex items-center justify-center -rotate-45 h-10 w-10 rounded-full bg-gray-200 hover:bg-[#eb5a2a20] text-[#eb5b2a]">
                      <svg
                        className="w-5 h-5 transform rotate-90 -mr-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* End Chat Input Section */}
              </div>
            </div>
          ) : (
            <p className="w-full text-gray-500">
              Select a conversation to start chatting
            </p>
          )}
        </>
      </div>
    </>
  );
};

export default Chat;
