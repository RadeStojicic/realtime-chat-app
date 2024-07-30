import MessageFrame from "./_components/MessageContainer/MessageFrame";
import Sidebar from "./_components/SidebarContainer/Sidebar";

const Home = () => {
  return (
    <div className="flex justify-between max-h-screen">
      <Sidebar />
      <MessageFrame />
    </div>
  );
};

export default Home;
