import { useState } from "react";
import Sidebar from "../components/Chat/SidebarChat";
import ChatContainer from "../components/Chat/ChatContainer";
import NoChatSelected from "../components/Chat/NoChatSelected";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <div className="h-screen bg-base-200 flex">
      <Sidebar setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <ChatContainer
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser} // ✅ Ahora se pasa correctamente
          messages={messages}
          setMessages={setMessages}
        />
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default ChatPage;
