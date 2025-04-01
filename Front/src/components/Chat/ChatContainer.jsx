import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = ({ selectedUser, messages, setMessages, setSelectedUser }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* 🔹 Pasamos setSelectedUser correctamente */}
      <ChatHeader selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-center gap-2 mb-2 ${message.sentByMe ? "justify-end" : "justify-start"}`}>
            {!message.sentByMe && (
              <img src={selectedUser?.ProfilePic || "/default-avatar.png"} className="size-10 rounded-full border" />
            )}
            <div className={`px-4 py-2 rounded-lg max-w-xs ${message.sentByMe ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>{message.text}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput setMessages={setMessages} />
    </div>
  );
};

export default ChatContainer;
