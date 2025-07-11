import React from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  // console.log(message);

  if (!message || !message.message) {
    console.warn('Message is empty or invalid:', message);
    return null;
  }

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const formattedTime = extractTime(message.createdAt);

  // Handle missing profile pic with fallback
  const profilePic = fromMe
    ? authUser.profilePic || '/path/to/default-profile-pic.png'  // Add fallback
    : selectedConversation?.profilePic || '/path/to/default-profile-pic.png'; // Add fallback

  // Background color based on message sender
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-600';

  // Shake class for the message bubble
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile"
            src={profilePic}
            onError={(e) => (e.target.src = '/path/to/default-profile-pic.png')} // Handle image load error
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer text-zinc-300 opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

// Prop validation (optional but good practice)
Message.propTypes = {
  message: PropTypes.shape({
    cnderId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    shouldShake: PropTypes.bool,
  }).isRequired,
};

export default Message;
