import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/store/useConversation";
import { TMessage } from "./Messages";

const Message = ({ message }: { message: TMessage }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const formattedDate = new Date(message.createdAt).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;

  return (
    <div className="flex flex-col  px-3 mt-6 ">
      <div className="flex items-start gap-2">
        <div className="w-10 rounded-full">
          <img
            className="rounded-full w-10 h-10"
            src={
              profilePic ||
              "https://avatar.iran.liara.run/username?username=guest"
            }
            alt="Avatar"
          />
        </div>
        <div className="flex justify-center gap-2 items-center">
          <div className="text-white">{authUser?.username}</div>
          <div className="opacity-50 text-xs">{formattedDate}</div>
        </div>
      </div>
      <p className="pl-12">{message.message}</p>
    </div>
  );
};
export default Message;
