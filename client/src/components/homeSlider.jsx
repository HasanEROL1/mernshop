import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderLib from "react-slick";
import { useNavigate } from "react-router-dom";

const HomeSlider = ({ products }) => {
  const navigate = useNavigate();
  // slider ayarları
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };
  const Slider = SliderLib.default || SliderLib;

  const sliderItems = products ? products.slice(0, 6) : [];

  if (sliderItems.length === 0) return null;

  return (
    <div className="container mx-auto px-4 mt-4 mb-8">
      <div className="rounded-4xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
        <Slider {...settings}>
          {sliderItems.map((product) => (
            <div key={product._id} className="outline-none ">
              <div className="flex flex-col md:flex-row items-center justify-between min-h-55 md:min-h-75 px-8 md:px-20 py-4">
                <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1 mt-6 md:mt-0 md:ml-2">
                  <span className="text-amber-600 font-bold tracking-widest uppercase text-2xl mb-1 block">
                    Haftanın Fırsatları
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                    <span className="text-2xl md:text-3xl font-light text-gray-400 line-through">
                      {(product.price * 1.2).toFixed(0)}₺
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-amber-500">
                      {product.price}₺
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-xl cursor-pointer hover:bg-gray-600">
                    Hemen incele
                  </button>
                </div>
                <div className="w-full md:w-1/2 h-35 md:h-65 flex justify-center items-center order-1 md:order-2">
                  <img
                    src={product.images && product.images[0] ? product.images[0].url : "/images/default.jpg"}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl p-6 md:p-10"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;
