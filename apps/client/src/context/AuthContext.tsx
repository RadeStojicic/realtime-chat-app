import { SignUpSchema } from "@/pages/auth/SignUp";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthUserWithId = SignUpSchema & {
  profilePicture: string;
  _id: string;
};

type AuthContextType = {
  authUser: AuthUserWithId | null;
  setAuthUser: Dispatch<SetStateAction<any>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedUser = localStorage.getItem("chat-user");
  const [authUser, setAuthUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
