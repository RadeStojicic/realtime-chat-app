import useGetConversations from "@/hooks/use-getConversations";
import { LoaderCircle } from "lucide-react";
import Conversation from "./Conversation";

export type TConversation = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
};

const Conversations = () => {
  const { conversations, loading } = useGetConversations();

  return (
    <div className="flex flex-col  bg-foreground/20 overflow-auto scrollbar h-5/6">
      {conversations.map((conversation: TConversation, index: number) => (
        <Conversation
          key={conversation._id + "-" + index}
          conversation={conversation}
          lastIndex={index === conversations.length - 1}
        />
      ))}
      <div className="flex items-center justify-center">
        {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      </div>
    </div>
  );
};
export default Conversations;
