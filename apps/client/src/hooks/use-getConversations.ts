import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      await axios
        .get("/api/users")
        .then((res) => {
          const data = res.data;
          if (data.error) {
            throw new Error(data.error);
          }
          setConversations(data);
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
    getConversations();
  }, []);
  return { conversations, loading };
};

export default useGetConversations;
