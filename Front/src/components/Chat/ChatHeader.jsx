import { X } from "lucide-react";

const ChatHeader = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.ProfilePic || "/default-avatar.png"}
                alt={selectedUser?.Name || "User"}
                className="size-10 rounded-full border"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.Name}</h3>
            <p className="text-sm text-base-content/70">Online</p> {/* Ya no verificamos en línea/offline */}
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
