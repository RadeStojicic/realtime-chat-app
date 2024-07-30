import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageFrame = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full border-l border-foreground relative max-h-screen pb-24 flex justify-start bg-foreground/30 ">
      <div className="flex flex-col w-full">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="flex items-center gap-3  border-b border-foreground w-full py-4 px-6">
              <img
                className="rounded-full w-10 h-10"
                src={selectedConversation.profilePicture}
                alt="User Avatar"
              />
              <span className="text-white font-bold">
                {selectedConversation.username}
              </span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    </div>
  );
};

export default MessageFrame;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center text-gray-200  flex flex-col items-center gap-2">
        <p className="text-2xl font-semibold">
          Welcome 👋
          {authUser?.username}
        </p>
        <p className="text-lg text-accent">Select a chat to start messaging</p>
      </div>
    </div>
  );
};
