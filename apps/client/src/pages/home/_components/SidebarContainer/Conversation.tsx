import { Separator } from "@/components/ui/separator";
import { useSocketContext } from "@/context/SocketContext";
import { cn } from "@/lib/utils";
import useConversation from "@/store/useConversation";
import { TConversation } from "./Conversations";

const Conversation = ({
  conversation,
  lastIndex,
}: {
  conversation: TConversation;
  lastIndex: boolean;
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isActive = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={cn(
          "flex gap-3 items-center hover:bg-foreground/30 px-3 py-2 cursor-pointer",
          isActive && "bg-foreground/60 hover:bg-foreground/60"
        )}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="w-10 rounded-full">
          <img src={conversation.profilePicture} alt="User Avatar" />
        </div>

        <div className="flex gap-3 flex-1 justify-between items-center">
          <p className="font-bold text-gray-200">{conversation.username}</p>
          {isOnline ? (
            <span className="w-3 h-3 bg-[#29a749] rounded-full"></span>
          ) : (
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </div>
      </div>
      {!lastIndex && <Separator className="bg-foreground h-[1px]" />}
    </>
  );
};
export default Conversation;
