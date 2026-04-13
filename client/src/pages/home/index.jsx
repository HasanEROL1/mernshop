import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";
import Loader from "../../components/loader";
import Error from "../../components/error";
import HomeSlider from "../../components/homeSlider";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);

  const handleAddtoCart = (e, product) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: product._id,
        qty: 1,

      })
    );
    toast.success(`${product.name} sepete eklendi!`, {
      theme: "colored",
    });

  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  console.log("Bütün ürünler geldi mi?:", products);
  if (error) return <Error message={error} />;

  return (
    <div className="bg-gray-50 min-h-screen">
      {products && products.length > 0 && <HomeSlider products={products} />}

      <div className="container">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Ürünlerimiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products &&
            products.map((product) => (

              <div
                onClick={() => navigate(`/products/${product._id}`)}
                key={product._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow:sm hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="h-48 overflow-hidden cursor-pointer">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col grow-3 cursor-pointer">
                  <h4 className="text-lg font-semibold text-gray-700 truncate mb-2">
                    {product.name}
                  </h4>
                  <p className="text-xl font-bold text-amber-600 mb-4">{product.price} ₺</p>
                  <button
                    onClick={(e) => handleAddtoCart(e, product)}
                    className="mt-auto w-full bg-red-200 text-orange-900 shadow-2xl rounded-md px-3 py-2 cursor-pointer hover:bg-red-300">
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
        </div>

      </div>
      <Link to={`/products`}>
        <p className="text-center text-zinc-600 mt-4 text-md transition-all duration-300 hover:text-zinc-800 cursor-pointer">
          Tüm ürünleri görmek için <span className="text-blue-500 underline text-lg font-bold hover:text-blue-700 ">tıklayın →</span>
        </p>
      </Link>

    </div>
  );
};

export default Home;
