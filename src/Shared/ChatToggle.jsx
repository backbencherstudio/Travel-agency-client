import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp, IoClose } from "react-icons/io5";
import MessageRight from "../Components/Dashboard/chat/Components/MessageRight";
import MessageLeft from "../Components/Dashboard/chat/Components/MessageLeft";

const ChatToggle = () => {
  const [isOpen, setIsOpen] = useState(false); // State for toggling chat box

  const messages = [
    {
      id: 1,
      dirac: "left",
      avatar:
        "https://t4.ftcdn.net/jpg/04/19/94/59/360_F_419945971_YNfDJMmW1nrXi63PGJ6zTqvWwS2RviKK.jpg",
      naame: "Bonnie Green",
      time: "11:46",
      text: "So, Have you selected the day you want to travel? and how many youare to go together?",
    },
    {
      id: 2,
      dirac: "right",
      avatar:
        "https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F10-Most-Famous-Male-Models-of-All-Time.jpg&w=1200&q=75",
      naame: "Blue Cat",
      time: "11:46",
      text: "Hello.",
    },
  ];

  return (
    <>
      {/* Container for the Chat Toggle */}
      <div className="fixed bottom-[11%] right-[3%] z-50">
        {/* Chat Icon/Button */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggles the chat box visibility
          className="p-3 bg-[#f974164b] text-[#f97316] rounded-full shadow-lg transition hover:bg-[#f97316] hover:text-[#f2f2f2]"
          aria-label="Toggle Chat" // Accessibility label for screen readers
        >
          <IoChatbubbleEllipsesSharp className="h-8 w-8" />
        </button>

        {/* Chat Box */}
        {isOpen && ( // Render the chat box only when `isOpen` is true
          <div className="absolute">
            <div className="fixed bottom-[18%] right-[3%]">
              <div className="w-[100%] h-[60vh] relative overflow-hidden transition-all duration-150 bg-white user-chat shadow">
                <div className="lg:flex">
                  {/* Start Chat Conversation Section */}
                  <div className="relative w-full">
                    {/* Start Chat User Header */}
                    <div className="p-4 border-b border-gray-100 lg:py-4 lg:px-6">
                      <div className="grid items-center grid-cols-12">
                        <div className="col-span-8 sm:col-span-4">
                          <div className="flex items-center">
                            {/* User Avatar */}
                            <div className="ltr:mr-3">
                              <img
                                src="https://d1uuxsymbea74i.cloudfront.net/images/cms/1_2_passport_photo_young_female_84b29b8fcb.jpg"
                                className="rounded-full h-9 w-9 object-cover"
                                alt="User Avatar"
                              />
                            </div>
                            {/* User Name and Status */}
                            <div className="flex-grow overflow-hidden">
                              {/* For LTR Languages */}
                              <h5 className="mb-0 truncate ltr:block">
                                <a
                                  href="#"
                                  className="text-gray-800 pl-4 font-bold text-lg"
                                >
                                  Doris Brown
                                </a>{" "}
                                <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill"></i>
                              </h5>
                            </div>
                          </div>
                        </div>
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
                    </div>
                    {/* End Chat User Header */}

                    {/* Start Chat Conversation */}
                    <div
                      className="h-[73vh] p-4 lg:p-6 overflow-y-auto"
                      data-simplebar
                    >
                      {messages.map((data, index) => {
                        if (data.dirac === "right") {
                          return (
                            <MessageRight
                              key={index}
                              avatar={data.avatar}
                              naame={data.naame}
                              time={data.time}
                              text={data.text}
                            />
                          );
                        } else {
                          return (
                            <MessageLeft
                              key={index}
                              avatar={data.avatar}
                              naame={data.naame}
                              time={data.time}
                              text={data.text}
                            />
                          );
                        }
                      })}
                      {/* <Message isLeft={true} /> */}
                    </div>
                    {/* End Chat Conversation */}
                  </div>
                  {/* End Chat Conversation Section */}

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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatToggle;
