const MessageRight = ({avatar, naame, time, text}) => {
  return (
    <>
      {/* Message from Doris Brown */}
      <div className="flex items-start justify-end gap-2.5 mb-4">
        {/* Message Container */}
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-tr-none">
          {/* Sender Info */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">
            {naame}
            </span>
            <span className="text-sm font-normal text-gray-500">{time}</span>
          </div>

          {/* Message Content */}
          <p className="text-base font-normal py-2.5 text-gray-900">{text}</p>
        </div>

        {/* User Avatar */}
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={avatar}
          alt="Jese"
        />
      </div>
      {/* Message Container */}
    </>
  );
};

export default MessageRight;
