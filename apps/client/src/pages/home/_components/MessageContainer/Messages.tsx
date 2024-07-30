import useGetMessages from "@/hooks/use-getMessages";
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
  const { messages } = useGetMessages();

  //   useListenMessages();
  //   const lastMessageRef = useRef();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  //     }, 100);
  //   }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto  scrollbar">
      {messages.length > 0 &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Send a message to start a conversation.</p>
        </div>
      )}
    </div>
  );
};
export default Messages;
