import Conversations from "./Conversations";
import LogOut from "./LogOut";
import SearchBar from "./SearchBar";

const Sidebar = () => {
  return (
    <div className="bg-foreground/30 w-1/3 h-screen relative">
      <SearchBar />
      <Conversations />
      <LogOut />
    </div>
  );
};

export default Sidebar;
