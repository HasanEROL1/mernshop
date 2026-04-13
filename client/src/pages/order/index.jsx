import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../../redux/slices/cartSlice";


const Order = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])
  return (
    <div className="flex items-center justify-center flex-1 h-full p-6">
      <div className="admin-form-container w-full max-w-lg text-center">
        <div className="text-6xl mb-4"> 🎉 </div>
        <h2 className="text-2xl font-bold text-zinc-800 mb-2">Siparişiniz Alındı!</h2>
        <p className="text-zinc-500 text-sm mb-8">Siparişiniz başarıyla oluşturuldu. En kıs sürede kargoya verilecektir.</p>

        <div className="bg-orange-50 rounded-2xl p-4 mb-8 text-left">
          <p className="text-orange-600 font-bold text-xs tracking-widest mb-3">
            SİPARİŞ BİLGİSİ
          </p>
          <div className="flex justify-between text-sm text-zinc-600 py-2 border-b border-orange-100">
            <span>
              Sipariş Durumu </span>

            <span className="text-green-500 font-bold">Hazırlanıyor</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600 py-2 border-b border-orange-100">
            <span>Tahmini Telimat</span>
            <span className="font-semibold">3-5 İş Günü</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600 py-2 border-b border-orange-100">
            <span>
              Ödeme Şekli
            </span>
            <span>Kapıda Ödeme</span>
          </div>

        </div>
        <button onClick={() => navigate("/")}
          className="admin-submit-btn w-full"
        >
          Alışverişe Devam et
        </button>
      </div>
    </div>
  )
}

export default Order
