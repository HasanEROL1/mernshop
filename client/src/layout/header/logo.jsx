import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <h1 className="absolute left-1/2 -translate-x-1/2 top-1/2 text-3xl md:text-5xl text-orange-100 font-bold tracking-wide drop-shadow-md z-10 transition-transform hover:scale-105 active:scale-95">
      <Link to="/" className="select-none">
        MERNSHOP
      </Link>
    </h1>
  );
};

export default Logo;
