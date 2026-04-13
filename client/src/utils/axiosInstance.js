
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// token kontrolü

axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// token süresi biterse kullanıcıyı logout yap ve uyar
axiosInstance.interceptors.response.use(
  (response) => response, // başarılıysa geçsin
  (error) => {


    if (error.response && error.response.status === 401) {
      if (!error.config.url.includes("/login")) {
        localStorage.removeItem("user");


        console.log("hata token hatası", error)
        toast.error("Oturum süreniz doldu, lütfen tekrar giriş yapın!", {
          position: "top-right",
          autoClose: 3000,
        });
        // tokeni sil
        localStorage.removeItem("user")
        //login sayfasına yönlendir

        setTimeout(() => {
          window.location.href = "/auth"
        }, 2800)


      }
    }
    return Promise.reject(error)
  }

)
export default axiosInstance;