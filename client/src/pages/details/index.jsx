import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetail } from "../../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import Error from "../../components/error";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { toast } from "react-toastify";

import { FaMinus, FaPlus } from "react-icons/fa";

import { useMemo } from "react";
import { addToCart } from "../../redux/slices/cartSlice";

const Detail = () => {
  const { id } = useParams();


  const dispatch = useDispatch();
  const { loading, product, products, error } = useSelector((state) => state.products);
  const [scrollRef, setScrollRef] = useState(null);
  const scrollLeft = () => scrollRef?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef?.scrollBy({ left: 300, behavior: "smooth" });
  // Aynı kategorideki ama baktığımız ürün OLMAYAN ürünleri ayıklıyoruz:
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products?.filter(
      p => p.category === product.category && p._id !== product._id
    );
  }, [products, product]);
  // adet state i
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  // Seçilen Resim
  const [selectedImg, setSelectedImg] = useState(null);
  console.log("URL'den Gelen Kimlik:", id);
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
      dispatch(getAllProducts());
    }
  }, [dispatch, id]);

  // resim kontrolü
  // Detail.jsx içinde return'den hemen önce şu satırı güncelle:
  const activeImg = selectedImg || (product?.images?.length > 0
    ? product.images[0].url : null);


  // sepete ekle
  const handleAddToCart = () => {
    if (product?.stock > 0) {
      dispatch(addToCart({ productId: product._id, qty: quantity }));
      toast.success(`${quantity} adet ${product.name} sepete eklendi!`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (!product || !product.name) {
    return <div className="p-10 text-center">Ürün Bulunamadı...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4  flex flex-col justify-start items-center ">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 bg-slate-900 p-5 rounded-2xl shadow-2xl border border-slate-700 mt-2">

        {/* SOL TARAF: RESİMLER */}
        <div className=" flex flex-col gap-3 md:w-5/12">
          <div className="bg-slate-800 rounded-xl p-3 flex justify-center items-center border border-slate-700 shadow-inner">
            <img
              src={activeImg || (product?.images && product.images.length > 0 ? product.images[0].url : "https://fakestoreapi.com")}
              className="w-full max-h-70 lg:max-h-90 object-contain transition-all duration-300"
              alt={product.name}
            />
          </div>

          <div className="flex gap-3 overflow-x-auto py-2 scrolbar-hide">
            {product?.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={product.name}
                className={`w-20 h-20 cursor-pointer rounded-lg border-2 transition-all object-cover ${activeImg === img.url ? "border-orange-500 scale-105" : "border-slate-700 opacity-60 hover:opacity-100"}`}
                onClick={() => setSelectedImg(img.url)}
              />
            ))}
          </div>
        </div>
        {/* SAĞ TARAF: ÜRÜN BİLGİLERİ */}
        <div className="md:w-7/12 flex flex-col gap-3 justify-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-orange-500">{product.price}₺</span>
            <div className="flex items-center text-yellow-500 text-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {product?.rating >= star ? (
                    <BsFillStarFill className="text-xl" />
                  ) : product?.rating >= star - 0.5 ? (
                    <BsStarHalf className="text-xl" />
                  ) : (
                    <BsStar className="text-xl text-gray-300" />
                  )}
                </span>
              ))}
              <span className="text-sm text-zinc-500 ml-1">{product?.rating || 0}</span>
            </div>
          </div>


          <p className="text-slate-400 text-sm leading-snug border-b border-slate-800  pb-3 line-clamp-3">
            {product.description}
          </p>
          <div className="text-xs">
            <span className="font-semibold text-slate-500">Stok Durumu:</span>
            {product?.stock > 0 ? (

              <span className="text-green-600 font-medium"> {product?.stock} Adet Mevcut</span>
            ) : (
              <span className="text-red-600 font-medium italic">Tükendi</span>
            )}
          </div>


          {product.stock > 0 && (
            <div className=" flex items-center gap-4 mt-4">
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl cursor-pointer">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-3 hover:bg-orange-500 text-orange-600 transition-colors cursor-pointer">
                  <FaMinus size={14} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => (prev < product.stock ? prev + 1 : prev))}
                  className="p-3 hover:bg-orange-50 text-orange-600 transition-colors cursor-pointer disabled:opacity-0">
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            disabled={product?.stock <= 0}
            className={`mt-6 bg-orange-600 text-white py-3 px-8 rounded-md hover:bg-orange-700 transition-all shadow-md active:scale-95
        ${product?.stock > 0 ? "bg-orange-600 text-white hover:bg-orange-700 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
        `}>
            {product.stock > 0 ? `SEPETE EKLE (${quantity})` : "STOKTA YOK"}
          </button>
        </div>
      </div>


      {/* BENZER ÜRÜNLER SLIDER */}
      <div className="w-full max-w-5xl mx-auto mt-12 px-4 pb-12">
        <div className="flex justify-between items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <h3 className="text-2xl font-bold text-white ml-5"> <span className="text-orange-500">Benzer</span> Ürünler </h3>
          <div className="flex gap-2 mr-5">
            <button
              onClick={scrollLeft}
              className="bg-slate-800 hover:bg-orange-500 text-white px-3 py-1 rounded-lg transition-all text-xl font-bold"> ←</button>
            <button
              onClick={scrollRight}
              className="bg-slate-800 hover:bg-orange-500 text-white text-xl font-bold px-3 py-1 rounded-lg transition-all"> → </button>
          </div>
        </div>
        <div ref={setScrollRef}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide">
          {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <div key={item._id} onClick={() => { navigate(`/products/${item._id}`); window.scrollTo(0, 0); }}
                className="min-w-55 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:border-orange-500 transition-all cursor-pointer group">
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img src={item.images[0] ? item.images[0].url : "https://placeholder.com"}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform" alt={item.name} />
                </div>
                <h4 className="text-sm font-semibold truncate text-slate-100">{item.name}</h4>
                <p className="text-orange-500 font-extrabold">{item.price} ₺</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic">Benzer ürün bulunamadı...</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default Detail;
