import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCircleMinus, FaCirclePlus, FaTrash } from "react-icons/fa6";
import { useEffect } from 'react';
import { fetchCart, removeFromCart, updateCartItem } from '../../redux/slices/cartSlice';
import Loader from '../../components/loader';
const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { cartItems, loading } = useSelector((state) => state.cart)

  useEffect(() => {
    if (user) dispatch(fetchCart())
  }, [dispatch, user])
  if (loading) return <Loader />

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product?.price * item.qty, 0)

  const shippingPrice = totalPrice > 500 ? 0 : 200
  const grandTotal = totalPrice + shippingPrice

  return (

    <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-screen ">
      {/* Ürünler- (sol taraf) */}
      <div className="w-7/12 flex-col gap-3">
        {cartItems.length === 0 ? (
          <div className='text-center text-red-500 text-2xl py-20'>Sepetiniz Boş</div>
        ) : (
          cartItems.filter(item => item.product).map((item => (
            <div key={item.product._id}
              className="bg-white p-4 rounded-xl border border-gray-200 flex  gap-4 items-center res">
              <img
                src={item.product?.images?.[0]?.url} alt={item.name}
                className='w-20 h-20  object-contain' />

              <div className='flex-1 '>
                <h4 className="font-bold text-gray-700">{item.product?.name}</h4>
                <p className='text-orange-600 font-extrabold '>{item.product?.price}₺</p>
              </div>

              {/* Adet  */}
              <div className='flex items-center gap-2 border border-gray-200 rounded-lg px-1 py-1'>
                <button
                  onClick={() => item.qty > 1 ? dispatch(updateCartItem({
                    productId: item.product?._id, qty: item.qty - 1
                  })) : dispatch(removeFromCart(item.product?._id))
                  } className='px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-lg border border-transparent  hover:text-red-100'
                ><FaCircleMinus size={15}
                  className='text-red-500' /></button >
                <span className='font-semibold text-zinc-500'>{item.qty}</span>
                <button
                  onClick={() => dispatch(updateCartItem({
                    productId: item.product?._id, qty: item.qty + 1
                  }))}
                  className='px-3 py-1 bg-gray-100 rounded-lg hover:bg-green-100 border border-transparent'
                ><FaCirclePlus size={15} className='text-green-500' /></button>
              </div>
              {/* Sil */}
              <button onClick={() => dispatch(removeFromCart(item.product?._id))}>
                <span className='flex items-center text-xs gap-1 border border-transparent '>  <FaTrash size={15}
                  className='text-red-500 ' />Sil</span>
              </button>
            </div>
          )))
        )}
      </div>

      {/* Sağ - Sipariş Özeti */}
      <div className="w-full lg:w-5/12  lg:fixed top-55 -right-5 p-8 ">
        <div className='bg-white p-6 rounded-xl border border-gray-200 sticky top-4'>
          <h3 className='text-xl text-black/90 shadow-sm font-bold mb-4 border-b border-zinc-400 pb-3'>Sipariş Özeti</h3>

          <div className='flex justify-between mb-2 text-gray-600'>
            <span>Ürünler ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
            <span>{totalPrice}₺</span>
          </div>
          <div className='flex justify-between mb-4 text-gray-600'>
            <span>Kargo</span>
            {shippingPrice === 0 ? (
              <span className='text-green-500'>Ücretsiz</span>
            ) : (
              <span className='text-red-500'>{shippingPrice}₺</span>
            )}
          </div>

          {shippingPrice > 0 && (
            <p className='text-xs text-gray-400'>500 ₺ ve üzeri alışverişlerde kargo ücretsiz</p>
          )}
          <div className='flex justify-between font-bold text-lg border-t mt-4 pt-3'>
            <span>Toplam:</span>
            <span>{grandTotal}₺</span>
          </div>




          <button onClick={() => navigate("/order")}
            disabled={cartItems.length === 0}
            className='w-full mt-6 bg-orange-500 text-white rounded-xl cursor-pointer  hover:bg-orange-600 transition-all disabled:opacity-40'
          >Siparişi Tamamla</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
