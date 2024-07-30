import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { SignUpSchema } from "../pages/auth/SignUp";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (data: SignUpSchema) => {
    setLoading(true);
    await axios
      .post("/api/auth/sign-up", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }

        localStorage.setItem("chat-user", JSON.stringify(data));

        setAuthUser(data);
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
  return { signup, loading };
};

export default useSignup;
