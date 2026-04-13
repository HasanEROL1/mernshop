import { useNavigate } from "react-router-dom";

const Categories = () => {

  const navigate = useNavigate()
  const handleClick = (cat) => {
    navigate(`/products?category=${encodeURIComponent(cat)}`);
  }
  const categories = ["Elektronik", "Giyim", "Ev&Yaşam", "Kişisel Bakım"];
  return (
    <nav
      className="w-full max-w-full bg-white py-4 shadow-sm border-b mb-8 ">
      <ul className="flex flex-row items-center justify-start md:justify-center gap-10 overflow-x-auto no-scrollbar whitespace-nowrap px-8 list-none ">
        {categories.map((cat, i) => (
          <li
            onClick={() => handleClick(cat)}
            key={i}
            className="cursor-pointer font-semibold text-gray-700 hover:text-amber-500 transition-all text-sm uppercase tracking-wide">
            {cat.toLocaleUpperCase("tr-TR")}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
