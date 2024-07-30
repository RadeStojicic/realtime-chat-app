import { toast } from "@/components/ui/use-toast";
import useConversation from "@/store/useConversation";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      await axios
        .get(`/api/messages/${selectedConversation?._id}`)
        .then((res) => {
          const data = res.data;

          if (data.error) {
            throw new Error(data.error);
          }
          setMessages(data);
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
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
