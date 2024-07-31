import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import useLogout from "@/hooks/use-logout";
import { LoaderCircle, LogOutIcon } from "lucide-react";

const LogOut = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="absolute flex items-center justify-between bottom-0 bg-foreground w-full px-4 py-2">
      <p className="font-semibold">{authUser?.username}</p>
      {loading ? (
        <Button
          variant="ghost"
          size="lg"
          className="hover:bg-transparent p-0  hover:text-white/80 flex items-center justify-end"
          disabled
        >
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          onClick={logout}
          className="hover:bg-transparent p-0 hover:text-white/80 flex items-center gap-2"
          variant="ghost"
        >
          <LogOutIcon className="mt-1" size={18} />
        </Button>
      )}
    </div>
  );
};

export default LogOut;
