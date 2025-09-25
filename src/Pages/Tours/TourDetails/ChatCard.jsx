import { useEffect, useRef, useState } from "react";
import "./tourDetails.css";
import { UserServices } from "~/userServices/user.services";
import { IoIosSend } from "react-icons/io";
import { FaThumbsUp } from "react-icons/fa";

export default function Chatcard({ handleChatOpen }) {
  const [userMessage, setUserMessage] = useState("");
  const [MessageList, setMessageList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const openFileInput = useRef(null);
  const [suggestions, setSuggestions] = useState([
    "Find packages",
    "New booking",
    "Popular Destinations",
    "Help",
  ]);

  const scrollRef = useRef(null);


  const parseMessage = (message) => {
    const cleaned = message.replace(/```json|```/g, "").trim();
    try {
      return JSON.parse(cleaned)?.message;
    } catch (e) {
      return message;
    }
  };

  const sendUserMessage = async (e) => {
    console.log("Event : ",e);
    if ((e.key === "Enter" && userMessage.trim() !== "") || e.type === 'click') {
      setUserMessage("");
      setMessageList((prev) => [...prev, ["user", userMessage]]);
      try {
        const res = await UserServices?.sendMessageToChatbot({
          message: userMessage,
        });
        if (res?.success) {
          setSuggestions(res?.data?.quickReplies);
          setMessageList((prev) => [...prev, ["chatbot", parseMessage(res?.data?.message)]]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Handle file
  const handleUploadedFile = (e) => {
    setUploadedFile(e.target.value);
  };

  // Scroll to bottom when message list updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [MessageList]);

  const handleSuggestionClick = async(text) => {
    setMessageList((prev) => [...prev, ["user", text]]);
      try {
        const res = await UserServices?.sendMessageToChatbot({
          message: text,
        });
        if (res?.success) {
          setSuggestions(res?.data?.quickReplies);
          setMessageList((prev) => [...prev, ["chatbot", parseMessage(res?.data?.message)]]);
        }
      } catch (err) {
        console.log(err);
      }
  };

  const handleFileFieldOpen = () => {
    openFileInput.current.click();
  };

  return (
    <div className="bg-white rounded-2xl flex flex-col relative w-full max-w-[822px] min-h-[700px] mr-8 ml-3">
      {/* Header */}
      <div className="bg-[#061D35] flex items-center py-4 rounded-t-2xl">
        <div className="p-5">
          <div
            className="p-[6px] bg-[#b9f5f333] w-[30px] h-[30px] rounded-[5px] cursor-pointer"
            onClick={handleChatOpen}
          >
            {/* Back Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                d="M11.25 15c-.192 0-.384-.073-.53-.22L5.47 9.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 111.06 1.06L7.06 9l5.72 5.72a.75.75 0 01-.53 1.28z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-[28px] font-bold">Wepasser</h3>
          <span className="text-[#D0D5DD]">By Around 360</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="overflow-hidden">
        {MessageList?.length >= 1 ?<div className="w-full flex-1 overflow-y-scroll hide-scrollbar px-5 py-10 flex flex-col gap-2 h-[480px]">
          {MessageList?.map((message, index) => (
            <div key={index}>
              {message[0] === "user" ? (
                <div className="w-full flex flex-col items-end">
                  <div className="px-[12px] py-[15px] bg-[#E7F7EF] rounded-xl text-[14px] font-medium text-[#111827] max-w-[242px] break-all text-wrap">
                    {message[1]}
                  </div>
                  <div className="flex gap-1 text-[#A0AEC0] text-[10px] items-center">
                    {new Date().getHours()} : {new Date().getMinutes()}
                    {/* Tick Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M2.92 10.217l3.198 3.201 6.407-6.403M9.96 13.418l6.407-6.403"
                        stroke="#CBD5E0"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 w-full">
                  <div className="bg-[#CEEFDF] w-[39px] h-[39px] rounded-full text-[13px] flex items-center justify-center font-extrabold text-[#27A376] relative">
                    WR
                    <div className="absolute -right-[1px] -bottom-[1px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <circle
                          cx="7.01"
                          cy="7.014"
                          r="5.202"
                          fill="#27A376"
                          stroke="#fff"
                          strokeWidth="2.4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="px-[12px] py-[15px] bg-[#E7F7EF] rounded-xl text-[14px] font-medium text-[#111827] max-w-[242px] break-all text-wrap">
                    {message[1]}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
        :(
            <div className="w-full flex-1 overflow-y-scroll hide-scrollbar px-5 py-10 flex flex-col items-center justify-center text-3xl opacity-40 gap-2 h-[480px]">
                <h3>Welcome to wepaser support.</h3>
            </div>
        )
        }
      </div>

      {/* Input Area */}
      <div className="p-5">
        <div className="flex flex-col gap-8 overflow-hidden">
          {/* Suggestions */}
          <div className="flex gap-[15px] flex-wrap">
            {suggestions.map((opt, index) => (
              <button
                key={index}
                className="px-[16px] py-[8px] text-[#083E89] border border-[#083E89] w-fit rounded-2xl hover:bg-[#083E89] hover:text-white transition"
                onClick={() => handleSuggestionClick(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex w-full items-center justify-between gap-3">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={sendUserMessage}
              name="userMessage"
              id="userMessage"
              autoComplete="off"
              placeholder="Type and press [Enter]"
              className="placeholder:text-sm px-3 py-3 text-base outline-none rounded-[5px] flex-1 border"
            />
            {/* Add your send icons or actions here */}
            <div className="flex gap-[10px]">
              {!userMessage?<button
                className="cursor-pointer text-4xl text-[#061D35]"
                onClick={() => handleSuggestionClick(`👍`)}
              >
                <FaThumbsUp />
              </button>
              :
              <button onClick={sendUserMessage} type="button" className="text-4xl text-[#061D35]">
                <IoIosSend />
              </button>}
              {/* <div className="cursor-pointer" onClick={handleFileFieldOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5013 5.83268C7.5013 3.5315 9.3668 1.66602 11.668 1.66602C13.9691 1.66602 15.8346 3.5315 15.8346 5.83268V12.4993C15.8346 15.721 13.223 18.3327 10.0013 18.3327C6.77964 18.3327 4.16797 15.721 4.16797 12.4993V7.49935C4.16797 7.03911 4.54107 6.66601 5.0013 6.66601C5.46154 6.66601 5.83464 7.03911 5.83464 7.49935V12.4993C5.83464 14.8005 7.70012 16.666 10.0013 16.666C12.3025 16.666 14.168 14.8005 14.168 12.4993V5.83268C14.168 4.45197 13.0487 3.33268 11.668 3.33268C10.2872 3.33268 9.16797 4.45197 9.16797 5.83268V12.4993C9.16797 12.9596 9.54105 13.3327 10.0013 13.3327C10.4616 13.3327 10.8346 12.9596 10.8346 12.4993V7.49935C10.8346 7.03911 11.2077 6.66601 11.668 6.66601C12.1282 6.66601 12.5013 7.03911 12.5013 7.49935V12.4993C12.5013 13.8801 11.3821 14.9993 10.0013 14.9993C8.62055 14.9993 7.5013 13.8801 7.5013 12.4993V5.83268Z"
                    fill="#1D1F2C"
                  />
                </svg>
                <input
                  type="file"
                  name="uploadfile"
                  id="uploadfile"
                  ref={openFileInput}
                  value={uploadedFile}
                  onChange={handleUploadedFile}
                  className="hidden"
                />
              </div> */}
              {/* <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_6325_21493)">
                    <path
                      d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0ZM10 18.75C5.1675 18.75 1.25 14.8325 1.25 10C1.25 5.1675 5.1675 1.25 10 1.25C14.8325 1.25 18.75 5.1675 18.75 10C18.75 14.8325 14.8325 18.75 10 18.75Z"
                      fill="#1D1F2C"
                    />
                    <path
                      d="M6.875 8.125C7.56536 8.125 8.125 7.56536 8.125 6.875C8.125 6.18464 7.56536 5.625 6.875 5.625C6.18464 5.625 5.625 6.18464 5.625 6.875C5.625 7.56536 6.18464 8.125 6.875 8.125Z"
                      fill="#1D1F2C"
                    />
                    <path
                      d="M13.125 8.125C13.8154 8.125 14.375 7.56536 14.375 6.875C14.375 6.18464 13.8154 5.625 13.125 5.625C12.4346 5.625 11.875 6.18464 11.875 6.875C11.875 7.56536 12.4346 8.125 13.125 8.125Z"
                      fill="#1D1F2C"
                    />
                    <path
                      d="M14.375 10C14.375 12.4162 12.4163 14.375 10 14.375C7.58375 14.375 5.625 12.4162 5.625 10H4.375C4.375 13.1066 6.8934 15.625 10 15.625C13.1066 15.625 15.625 13.1066 15.625 10H14.375Z"
                      fill="#1D1F2C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6325_21493">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
