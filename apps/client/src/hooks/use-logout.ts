import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    await axios
      .post("/api/auth/log-out", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      })
      .catch((err: Error) => {
        console.log(err);
        toast({
          title: err.name || "An error occurred.",
          description: err.message || "Unable to log out. ",
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { logout, loading };
};

export default useLogout;
