const MessageRight = ({avatar, naame, time, text}) => {
  // Helper function to check if image URL is valid
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null || url.startsWith('http');
  };

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
          <p className="text-sm font-normal py-2.5 text-gray-900">{text}</p>
        </div>

        {isValidImageUrl(avatar?.avatar_url) ? (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={avatar.avatar_url}
            alt={naame}
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  ${naame?.charAt(0)?.toUpperCase() || '?'}
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            {naame?.charAt(0)?.toUpperCase() || '?'}
          </div>
        )}
      </div>
      {/* Message Container */}
    </>
  );
};

export default MessageRight;
