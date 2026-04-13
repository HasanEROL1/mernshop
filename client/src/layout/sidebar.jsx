import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import {

  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineTag,
  HiOutlineShoppingCart,

} from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";



const Sidebar = ({ isOpen, closeSide }) => {
  const { user } = useSelector((state) => state.user);
  const menus = [
    {
      name: "Ana Sayfa",
      path: "/",
      icon: <HiOutlineHome size={22} />,
      end: true,
    },
    {
      name: "Ürünler",
      path: "/products",
      icon: <HiOutlineShoppingBag size={22} />,
    },
    {
      name: "Kampanyalar",
      path: "/campaigns",
      icon: <HiOutlineTag size={22} />,
    },
    {
      name: "Sepetim",
      path: "/cart",
      icon: <HiOutlineShoppingCart size={22} />,
    },
    {
      name: "Admin Paneli",
      path: "/admin",
      icon: <MdAdminPanelSettings size={22} />,
      isAdmin: true
    },

  ];
  const filteredMenus = menus.filter(item =>
    !item.isAdmin || (user && user.role === "admin")
  );
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 xl:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSide}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-48 md:w-20 bg-white border-r border-zinc-200 transition-all duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block shadow-2xl md:shadow-none`}>
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 flex justify-center">
            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden md:block">
              MERN
            </h2>
          </div>

          <nav className="flex-1 px-3 space-y-4">
            {filteredMenus.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeSide}
                title={item.name}
                className={({ isActive }) =>
                  `group flex items-center justify-center md:justify-start px-3 md:px-4 py-3 rounded-lg font-medium transition-all ${isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "text-zinc-600 hover:bg-zinc-100"
                  }`
                }>
                <span className="transition-transform group-hover:scale-110 shrink-0">{item.icon}</span>
                <span className="absolute left-24 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none hidden md:group-hover:block">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
