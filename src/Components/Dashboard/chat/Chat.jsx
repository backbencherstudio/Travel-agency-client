import { useParams } from "react-router-dom";
import "./style.css";
import { FaSearch } from "react-icons/fa";
import MessageLeft from "./Components/MessageLeft";
import MessageRight from "./Components/MessageRight";
import User from "./Components/User";

const Chat = () => {
  const { conversationID } = useParams();

  console.log(conversationID);

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

  const users = [
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/01/98/68/53/360_F_198685380_UiiR2lCHgg7raR054Dv9v5cuOYdLCEdX.jpg",
      name: "Doris Brown",
      hint: "Nice to meet you",
      time: "10:12 AM",
    },
    {
      id: 2,
      image:
        "https://t4.ftcdn.net/jpg/01/98/68/53/360_F_198685380_UiiR2lCHgg7raR054Dv9v5cuOYdLCEdX.jpg",
      name: "Michael Scott",
      hint: "Looking forward to our meeting",
      time: "10:15 AM",
    },
    {
      id: 3,
      image:
        "https://easy-peasy.ai/cdn-cgi/image/quality=70,format=auto,width=300/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/ae708cd1-68bb-4a2c-bca6-5a8923e8e7a4/afc178d7-36bd-48b2-aaa2-ffc6cdb45662.png",
      name: "Alice Johnson",
      hint: "Can we reschedule our call?",
      time: "11:00 AM",
    },
    {
      id: 4,
      image:
        "https://passure.ai/_next/image?url=%2Fimages%2Fshooting-tips%2Fgood-girl2.webp&w=3840&q=75",
      name: "Bob Smith",
      hint: "See you at the event",
      time: "11:30 AM",
    },
    {
      id: 5,
      image:
        "https://passure.ai/_next/image?url=%2Fimages%2Fshooting-tips%2Fgood-kid.webp&w=3840&q=75",
      name: "Charlie Davis",
      hint: "Happy Birthday!",
      time: "12:00 PM",
    },
    {
      id: 6,
      image:
        "https://cdn-3.convertexperiments.com/uf/10042538/10043394/hero_a.webp",
      name: "Eve Thompson",
      hint: "Let's catch up soon",
      time: "12:15 PM",
    },
    {
      id: 7,
      image:
        "https://d1uuxsymbea74i.cloudfront.net/images/cms/1_15_passport_photo_young_female_e35eecf32a.jpg",
      name: "Frank Miller",
      hint: "Project update",
      time: "1:00 PM",
    },
    {
      id: 8,
      image:
        "https://cdn.prod.website-files.com/650865454c2393ac25711ff2%2F66571b995893a7f3375a9138_passport-photo-maker-V3-poster-00001.jpg",
      name: "Grace Lee",
      hint: "Thanks for your help",
      time: "1:30 PM",
    },
    {
      id: 9,
      image:
        "https://passure.ai/_next/image?url=%2Fimages%2Fshooting-tips%2Fgood-kid.webp&w=3840&q=75",
      name: "Henry Wilson",
      hint: "Meeting at 3 PM",
      time: "2:00 PM",
    },
    {
      id: 10,
      image:
        "https://res.cloudinary.com/dq83xons7/image/upload/f_auto,w_512,c_fill/v1704979067/assets/adult-woman-passport-size-photo-sample3-before.jpg",
      name: "Ivy Martinez",
      hint: "Can you review the document?",
      time: "2:30 PM",
    },
    {
      id: 11,
      image:
        "https://t4.ftcdn.net/jpg/10/70/21/61/360_F_1070216164_zXSbEgNW849Yiho3h2ekoyUP1C1u4zgv.jpg",
      name: "Jack Brown",
      hint: "Lunch tomorrow?",
      time: "3:00 PM",
    },
    {
      id: 12,
      image:
        "https://d1uuxsymbea74i.cloudfront.net/images/cms/1_15_passport_photo_young_female_e35eecf32a.jpg",
      name: "Karen Taylor",
      hint: "Happy New Year!",
      time: "3:30 PM",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {/* Start Chat Left Sidebar */}
        <div className="chat-leftsidebar lg:w-auto shadow  overflow-y-hidden border-none sm:col-span-4 hidden sm:block">
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

                {/* Start Chat Message List */}
                <div>
                  <h5 className="px-6 mb-4 text-xl">Recent</h5>

                  {/* Scrollable Chat List */}
                  <div className="h-full px-2 " data-simplebar>


                    <ul className="chat-user-list">
                      {/* Chat User List Item */}
                      {users.map((data, index) => (
                        <User
                          key={index}
                          active={conversationID == data.id ? true : false}
                          id={data.id}
                          image={data.image}
                          name={data.name}
                          hint={data.hint}
                          time={data.time}
                        />
                      ))}
                    </ul>



                  </div>
                </div>
                {/* End Chat Message List */}
              </div>
              {/* End Chat Content */}
            </div>
          </div>
        </div>
        {/* End Chat Left Sidebar */}

        {conversationID ? (
          <div className="w-full h-[87.9vh] relative overflow-hidden transition-all duration-150 bg-white user-chat col-span-12 sm:col-span-8 shadow">
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
                            className="rounded-full h-9 w-9"
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
                  </div>
                </div>
                {/* End Chat User Header */}

                {/* Start Chat Conversation */}
                <div
                  className="h-[73vh] p-4 lg:p-6 overflow-y-auto "
                  data-simplebar
                >
                  {messages.map((data, index) => {
                    if (data.dirac == "right") {
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Chat;
