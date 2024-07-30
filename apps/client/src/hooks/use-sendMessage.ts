import { toast } from "@/components/ui/use-toast";
import useConversation from "@/store/useConversation";
import axios from "axios";
import { useState } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message: string) => {
    setLoading(true);
    await axios
      .post(`/api/messages/send/${selectedConversation?._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        message,
      })
      .then((res) => {
        const data = res.data;

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages([...messages, data]);
      })
      .catch((err: Error) => {
        console.log(err);
        toast({
          title: err.name || "An error occurred.",
          description: err.message || "Unable to sign up. ",
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendMessage, loading };
};

export default useSendMessage;
