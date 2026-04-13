import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/error";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";


const Register = ({ onSwitch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    }
    const result = await dispatch(register(userData))
    if (register.fulfilled.match(result))
      navigate("/");

    navigate("/");
  };
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-zinc-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-[40px] text-center font-bold text-orange-500">MERNSHOP</h1>
        <h5 className="mt-1 text-center text-xl font-bold tracking-tight text-zinc-500">
          Hesap Oluşturun
        </h5>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-zinc-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-zinc-700">
              Kullanıcı Adı
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="name"
                type="text"
                required
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm"
                placeholder="Ad Soyad"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              E-posta Adresi
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm"
                placeholder="ornek@mail.com"
              />
            </div>
          </div>


          <div >
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Şifre
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm"
              />

            </div>
          </div>

          <div >
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Şifrenizi tekrar girin
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="block w-full rounded-xl border-0 py-2.5 px-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm"
              />

            </div>
          </div>


          <div>
            <button
              type="submit" disabled={loading}
              className="flex w-full justify-center rounded-xl bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all active:scale-95">
              {loading ? <Loader /> : "Kayıt Ol"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Zaten bir hesabınız var mı?{" "}
          <button onClick={onSwitch} className="font-semibold text-orange-600 hover:text-orange-500 cursor-pointer"
          >
            Kayıt Ol
          </button>

        </p>
      </div>
    </div>
  )
}

export default Register
