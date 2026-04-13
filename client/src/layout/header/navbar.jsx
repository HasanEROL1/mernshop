import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart)
  return (
    <nav className="mt-4 border-t border-orange-400/30 pt-2">
      <ul className="flex items-center justify-center gap-5 text-red-50 font-medium text-lg ">
        <li className="nav-link">
          <Link to="/products" className="drop-shadow-sm">
            Ürünler
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/campaigns" className="drop-shadow-sm">
            Kampanyalar
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/Cart" className="drop-shadow-sm">
            <span>Sepet ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
