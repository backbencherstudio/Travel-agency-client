import React, { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';

const ChatHeader = ({ activeConversation }) => {
  const { user } = useContext(AuthContext);

  if (!activeConversation) {
    return (
      <div className="flex items-center">
        <div className="ltr:mr-3">
          <img
            src="https://via.placeholder.com/150"
            className="rounded-full h-9 w-9"
            alt="User Avatar"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h5 className="mb-0 truncate ltr:block">
            <span className="text-gray-800 pl-4 font-bold text-lg">
              Unknown
            </span>
            <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill"></i>
          </h5>
        </div>
      </div>
    );
  }

  // Determine if current user is the participant
  const isParticipant = user.id === activeConversation.participant_id;
  
  // Show creator's info if user is participant, otherwise show participant's info
  const displayUser = isParticipant ? activeConversation.creator : activeConversation.participant;
  
  return (
    <div className="flex items-center">
      <div className="ltr:mr-3">
        <img
          src={displayUser.avatar_url || "https://via.placeholder.com/150"}
          className="rounded-full h-9 w-9"
          alt="User Avatar"
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <h5 className="mb-0 truncate ltr:block">
          <span className="text-gray-800 pl-4 font-bold text-lg">
            {displayUser.name}
          </span>
          <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill"></i>
        </h5>
      </div>
    </div>
  );
};

export default ChatHeader;