import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  return (
    <input value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/products?keyword=${search}`)
      }}
      type="text"
      placeholder="Arama yapınız..."
      className="bg-orange-50 px-3 py-1.5 rounded-md text-sm outline-none focus:ring-2 ring-orange-300 w-20 md:w-48  transition-all max-md:gap-0"
    />
  );
};

export default Searchbar;
