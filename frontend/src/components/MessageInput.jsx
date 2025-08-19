import React from 'react';

const MessageInput = ({ newMessage, onChange, onSend }) => {
  return (
    <form onSubmit={onSend} className="flex gap-2 p-4 bg-gray-100 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white border-0 placeholder:text-gray-900 placeholder:dark:text-gray-100 outline-none rounded focus:outline-none focus:ring-2 focus:ring-purple"
        value={newMessage}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple text-white rounded hover:bg-purple"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
