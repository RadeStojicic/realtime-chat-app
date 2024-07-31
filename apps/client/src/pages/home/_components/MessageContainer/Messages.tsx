import useGetMessages from "@/hooks/use-getMessages";
import useListenMessages from "@/hooks/use-listenMessages";
import { useEffect, useRef } from "react";
import Message from "./Message";

export type TMessage = {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  updatedAt: Date;
  createdAt: Date;
};

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto  scrollbar">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Send a message to start a conversation.</p>
        </div>
      )}
    </div>
  );
};
export default Messages;
