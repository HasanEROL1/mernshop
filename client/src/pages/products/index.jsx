import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts } from "../../redux/slices/productSlice";
import Filter from "../../layout/filter/index";
import { useEffect, useMemo } from "react";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/error";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import Pagination from "../../components/pagination";

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate();
  const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);
  const [currentPage, setCurrentpage] = useState(1)
  const [showFilter, setShowFilter] = useState(false)
  const filters = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return {
      keyword: params.get("keyword"),
      categories: params.get("category")?.split(",") || [],
      minPrice: params.get("minPrice"),
      maxPrice: params.get("maxPrice"),
      page: currentPage,
    }
  }, [location.search, currentPage])


  useEffect(() => {

    const fetchProducts = () => {
      try {
        dispatch(getFilteredProducts(filters));

      } catch (error) {
        console.error("Ürünler getirilirken hata oluştu:", error);
      }
    };

    fetchProducts();
  }, [dispatch, filters,]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-50 min-h-screen m-0.5">
      <button onClick={() => setShowFilter(!showFilter)}
        className="md:hidden">
        {showFilter ? "Filtreyi Kapat ✕" : "Filtrele ☰"}

      </button>
      <div className={`md:block md:w-1/4 ${showFilter ? "block" : "hidden"}`}>
        <Filter />

      </div>

      <div className="w-full md:w-3/4">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product._id || i}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-white border border-gray-200 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all flex flex-col">
                <div className="h-40 overflow-hidden mb-3">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? (product.images[0].url || product.images[0])
                        : "https://fakestoreapi.com"
                    }
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-gray-700 truncate mb-2">{product.name}</h4>
                <p className="text-amber-600 font-extrabold">{product.price}₺</p>
                <div className="mt-auto pt-3 text-xs text-blue-400 italic text-right ">
                  İncelemek için tıkla
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-300 text-3xl py-20 font-bold ">
            Ürün Bulunmamaktadır!!!
          </div>

        )}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(productsCount / resultPerPage)}
          onPageChange={setCurrentpage}
        />
      </div>
    </div>
  );

};

export default Products;
