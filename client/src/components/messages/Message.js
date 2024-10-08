import React from "react";
import { useAuthContext } from "../../context/AuthContext.js";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime.js";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formatedDate = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeCLass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeCLass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-white flex gap-1 items-center">
        {formatedDate}
      </div>
    </div>
  );
};

export default Message;
