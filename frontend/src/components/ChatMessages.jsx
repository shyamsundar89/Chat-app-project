import React, { useEffect, useRef } from "react";
import { MdMarkUnreadChatAlt } from "react-icons/md";

const ChatMessages = ({ messages, userId, selectedUser }) => {
  const chatBoxRef = useRef();

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const getUserAvatar = (userId) => {
    // Isse avatar ka URL ya local storage se fetch kar sakte ho
    return `https://avatar.iran.liara.run/public/boy?userId=${userId}`;
  };

  const truncateChars = (text, charLimit = 4) => {
    if (!text) return '';
    return text.length <= charLimit ? text : text.slice(0, charLimit) + '...';
  };
  
  // const truncateWords = (text, wordLimit) => {
  //   if (!text) return '';
  //   const words = text.split(' ');
  //   console.log(words);
  //   return words.length <= wordLimit
  //     ? text
  //     : words.slice(0, wordLimit).join(' ') + '...';
  // };

  return (
    <div
      ref={chatBoxRef}
      className="flex-1 overflow-y-auto space-y-2 p-4 bg-gray-300 dark:bg-gray-900 text-white"
      // style={{
      //   backgroundImage: "url('/bg.png')",
      // }}
    >
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center h-full text-white text-xl">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 text-center">
            <div className="text-center flex justify-center items-center mb-4">
              <MdMarkUnreadChatAlt className="text-purple" style={{ fontSize: "160px" }} />
            </div>
            <div className="text-gray-700 dark:text-gray-400"> Yet! No messages with {truncateChars(selectedUser?.username || "Unknown", 4)}</div>
          </div>
        </div>
      ) : (
        messages.map((msg) => {
          const isSender = msg.sender === userId;
          const avatar = isSender
            ? getUserAvatar(msg.receiverId)
            : getUserAvatar(msg.sender);

          return (
            <div
              key={msg._id}
              className={`flex items-start space-x-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {!isSender && (
                <img
                  src={avatar}
                  alt="Receiver Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div
                className={`max-w-fit px-4 py-2 ${
                  isSender
                    ? "bg-purple text-white self-end ml-auto rounded-tl-[0.5rem] rounded-tr-[0.5rem] rounded-br-[0rem] rounded-bl-[0.5rem]"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 self-start mr-auto rounded-tl-[0.5rem] rounded-tr-[0.5rem] rounded-br-[0.5rem] rounded-bl-[0rem]"
                }`}
              >
                {msg.content}
              </div>
              {/* {isSender && (
              <img
                src={avatar}
                alt="Sender Avatar"
                className="w-10 h-10 rounded-full"
              />
            )} */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatMessages;
