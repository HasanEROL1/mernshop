import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  if (!user) return (
    <Link
      to="/auth"
      className="bg-white text-orange-500 font-bold px-4 py-2 rounded-xl hover:bg-orange-50 transition-all">
      Giriş Yap
    </Link>
  );
  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=ffedd5&textColor=f97316`
  console.log("user", user)

  return (
    <div className="flex items-center gap-3 bg-orange-600/20 p-1.5 pr-3 rounded-2xl border border-orange-400/20 ">

      <Link to="/profile" className="flex shrink-0 group ">
        <div className="w-11 h-11  rounded-full bg-orange-200 border-2 border-orange-100 overflow-hidden shadow-sm transition-transform group-hover:scale-105">
          <img
            src={
              user.avatar?.url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffedd5&color=f97316`}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?na }}me=${encodeURIComponent(user.name)}&background=ffedd5&color=f97316`
            }}

            alt={avatar}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-1">
        <div className=" hidden md:flex flex-col leading-none mt-1.5">
          <span className="text-orange-100 text-[11px] font-medium mb-0.5 opacity-90">
            Hoş geldiniz
          </span>
          <span className="text-white text-base font-extrabold tracking-tight group-hover:text-zinc-800 transition-colors">
            {user.name}
          </span>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className=" bg-red-100 text-[11px] font-bold text-zinc-700 px-3 py-1.5 rounded-md shadow-sm  hover:bg-red-200 transition-transform active:scale-95 cursor-pointer">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
