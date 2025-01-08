import "./style.css";
import { FaSearch } from "react-icons/fa";

const Chat = () => {
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
                      <li className="px-5 py-[15px] border-b border-white/20 active group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50">
                        <a href="#">
                          <div className="flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://t4.ftcdn.net/jpg/01/98/68/53/360_F_198685380_UiiR2lCHgg7raR054Dv9v5cuOYdLCEdX.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />
                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 bg-red-400 border-white rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Doris Brown
                              </h5>
                              <p className="text-gray-500 text-14">
                                Nice to meet you
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              10:12 AM
                            </div>
                          </div>
                        </a>
                      </li>

                      <li className="px-5 py-[15px] border-b border-white/20 ">
                        <a href="#">
                          <div className="flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://t4.ftcdn.net/jpg/01/98/68/53/360_F_198685380_UiiR2lCHgg7raR054Dv9v5cuOYdLCEdX.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />
                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white  bg-green-500 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Doris Brown
                              </h5>
                              <p className="text-gray-500 text-14">
                                Nice to meet you
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              10:12 AM
                            </div>
                          </div>
                        </a>
                      </li>

                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://t3.ftcdn.net/jpg/07/37/52/90/360_F_737529018_2LlTMSekPbErKle2LwQmz0Xn6vhVEWBN.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-green-500 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://easy-peasy.ai/cdn-cgi/image/quality=70,format=auto,width=300/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/ae708cd1-68bb-4a2c-bca6-5a8923e8e7a4/afc178d7-36bd-48b2-aaa2-ffc6cdb45662.png"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://passure.ai/_next/image?url=%2Fimages%2Fshooting-tips%2Fgood-girl2.webp&w=3840&q=75"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://passure.ai/_next/image?url=%2Fimages%2Fshooting-tips%2Fgood-kid.webp&w=3840&q=75"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://cdn-3.convertexperiments.com/uf/10042538/10043394/hero_a.webp"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://d1uuxsymbea74i.cloudfront.net/images/cms/1_15_passport_photo_young_female_e35eecf32a.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://passure.ai/_next/image?url=%2Fimages%2Fshooting-tips%2Fgood-kid.webp&w=3840&q=75"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://t4.ftcdn.net/jpg/10/70/21/61/360_F_1070216164_zXSbEgNW849Yiho3h2ekoyUP1C1u4zgv.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://res.cloudinary.com/dq83xons7/image/upload/f_auto,w_512,c_fill/v1704979067/assets/adult-woman-passport-size-photo-sample3-before.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://cdn.prod.website-files.com/650865454c2393ac25711ff2%2F66571b995893a7f3375a9138_passport-photo-maker-V3-poster-00001.jpg"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Unread Message Item */}
                      <li className="unread px-5 py-[15px] transition-all ease-in-out border-b border-white/20">
                        <a href="#">
                          <div className="relative flex">
                            <div className="relative self-center mr-3">
                              <img
                                src="https://easy-peasy.ai/cdn-cgi/image/quality=70,format=auto,width=300/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/ae708cd1-68bb-4a2c-bca6-5a8923e8e7a4/afc178d7-36bd-48b2-aaa2-ffc6cdb45662.png"
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Avatar"
                              />

                              {/* ========== active status ========== */}
                              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <h5 className="mb-1 text-base truncate">
                                Designer
                              </h5>
                              <p className="mb-0 text-gray-800 truncate text-14">
                                Next meeting tomorrow 10.00AM
                              </p>
                            </div>
                            <div className="text-gray-500 text-11">
                              12:01 PM
                            </div>
                          </div>
                        </a>
                      </li>
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
              <div className="h-[73vh] p-4 lg:p-6 overflow-y-auto " data-simplebar>




                  {/* Message from Doris Brown */}
                  <div className="flex items-start gap-2.5 mb-5">
                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://t4.ftcdn.net/jpg/04/19/94/59/360_F_419945971_YNfDJMmW1nrXi63PGJ6zTqvWwS2RviKK.jpg"
                      alt="Jese"
                    />

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#eb5a2a15] rounded-xl rounded-tl-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        Hello Sir, 
                        You Requested to travel Norway. ANd I'm here to know more about you and some details also.
                      </p>
                    </div>
                  </div>
                  {/* Message Container */}              





                  {/* Message from Doris Brown */}
                  <div className="flex items-start justify-end gap-2.5 mb-4">

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-tr-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        Hello. 
                      </p>
                    </div>

                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F10-Most-Famous-Male-Models-of-All-Time.jpg&w=1200&q=75"
                      alt="Jese"
                    />

                  </div>
                  {/* Message Container */}






                  {/* Message from Doris Brown */}
                  <div className="flex items-start gap-2.5 mb-5">
                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://t4.ftcdn.net/jpg/04/19/94/59/360_F_419945971_YNfDJMmW1nrXi63PGJ6zTqvWwS2RviKK.jpg"
                      alt="Jese"
                    />

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#eb5a2a15] rounded-xl rounded-tl-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        So, Have you selected the day you want to travel? and how many you are to go together?
                      </p>
                    </div>
                  </div>
                  {/* Message Container */}              









                  {/* Message from Doris Brown */}
                  <div className="flex items-start justify-end gap-2.5 mb-4">

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-tr-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        We are just Two friends. Maybe around end of this month.

                         Whenever we go. Will anyone go with us? as our personal
                      </p>
                    </div>

                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F10-Most-Famous-Male-Models-of-All-Time.jpg&w=1200&q=75"
                      alt="Jese"
                    />
                  </div>
                  {/* Message Container */}







                  {/* Message from Doris Brown */}
                  <div className="flex items-start gap-2.5 mb-5">
                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://t4.ftcdn.net/jpg/04/19/94/59/360_F_419945971_YNfDJMmW1nrXi63PGJ6zTqvWwS2RviKK.jpg"
                      alt="Jese"
                    />

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#eb5a2a15] rounded-xl rounded-tl-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        Yea. <br /> <br />
                        If you want you can take personal guide for you. But In that case, you have to pay some extra charge for your guide.
                      </p>
                    </div>
                  </div>
                  {/* Message Container */} 







                  {/* Message from Doris Brown */}
                  <div className="flex items-start gap-2.5 mb-5">
                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://t4.ftcdn.net/jpg/04/19/94/59/360_F_419945971_YNfDJMmW1nrXi63PGJ6zTqvWwS2RviKK.jpg"
                      alt="Jese"
                    />

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#eb5a2a15] rounded-xl rounded-tl-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        You can take me also as your personal Guide. <br />
                        If you want.
                      </p>
                    </div>
                  </div>
                  {/* Message Container */} 






                  {/* Message from Doris Brown */}
                  <div className="flex items-start justify-end gap-2.5 mb-4">

                    {/* Message Container */}
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-tr-none">
                      {/* Sender Info */}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          11:46
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-base font-normal py-2.5 text-gray-900">
                        😂 😂😂😂 
                      </p>
                    </div>

                    {/* User Avatar */}
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2023%2F06%2F10-Most-Famous-Male-Models-of-All-Time.jpg&w=1200&q=75"
                      alt="Jese"
                    />
                  </div>
                  {/* Message Container */}



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
    </>
  );
};

export default Chat;
