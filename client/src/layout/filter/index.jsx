import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Filter = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category");
  const minFromUrl = params.get("minPrice");
  const maxFromUrl = params.get("maxPrice");

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? categoryFromUrl.split(",") : []
  );
  const [priceRange, setPriceRange] = useState(
    {
      min: minFromUrl || "",
      max: maxFromUrl || ""
    });

  const categories = ["Elektronik", "Giyim", "Ev&Yaşam", "Kişisel Bakım",];
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (field, value) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {

    const query = new URLSearchParams();

    if (selectedCategories.length > 0) {

      query.set("category", selectedCategories.join(","));
    }
    if (priceRange.min) {
      query.set("minPrice", priceRange.min);
    }
    if (priceRange.max) {
      query.set("maxPrice", priceRange.max);
    }
    if (searchKeyword) {
      query.set("keyword", searchKeyword);
    }

    navigate(`/products?page=1&${query.toString()}`);

  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setSearchKeyword("");
    navigate("/products");

  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md:sticky md:top-4 max-h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Filtreler
      </h3>

      {/* Arama */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ürün Ara
        </label>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyFilters()
            }
          }}
          placeholder="Ürün adı..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Kategoriler */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Kategoriler
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Fiyat Aralığı (₺)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            placeholder="Min"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            placeholder="Max"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex gap-2">
        <button
          onClick={clearFilters}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Temizle
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
        >
          Uygula
        </button>
      </div>
    </div>
  );
};

export default Filter;
