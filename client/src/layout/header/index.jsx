import Logo from "./logo";
import Navbar from "./navbar";
import UserProfile from "./user-profile";
import { HiMenuAlt2 } from "react-icons/hi";
import Searchbar from "./searchbar";

const Header = ({ toggleSidebar }) => {
  return (
    <header className=" relative flex flex-col bg-orange-500/95 w-full h-auto  px-3 py-1 brightness-95 shadow-md top-0 z-50">
      <div className="flex justify-between items-center min-h-16 gap-2   md:relative">
        {/* Sidebar Button */}
        <div className="flex-1 flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
            <HiMenuAlt2 size={28} />
          </button>

          {/* ÜST KISIM */}
          <div className="flex-1 md:flex-none">
            <Searchbar />
          </div>
        </div>

        <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
          {/* LOGO */}
          <Logo />
        </div>

        {/* USER */}
        <div className="flex-1 flex justify-end">
          <UserProfile />
        </div>
      </div>
      {/* NAVBAR */}
      <Navbar />
    </header>
  );
};

export default Header;
