import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/header";
import Home from "./pages/home/index";
import Products from "./pages/products/index";
import Campaigns from "./pages/campaigns/index";
import Footer from "./layout/footer";
import Cart from "./pages/cart";
import Sidebar from "./layout/sidebar";
import { useEffect, useState } from "react";
import Auth from "./pages/auth";
import Detail from "./pages/details/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./layout/categories";
import Order from "./pages/order";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchCart } from "./redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "./pages/admin";

import ProductForm from "./pages/admin/ProductForm";
import ForgotPassword from "./pages/auth/forgot";
import ResetPassword from "./pages/auth/reset";
import Profile from './pages/profile/index';
const App = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);

  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) dispatch(fetchCart())
  }, [dispatch, user])

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={2000} />
      <BrowserRouter>
        <Header toggleSidebar={() => setIsSideOpen(!isSideOpen)} />
        <div className="flex flex-1 relative overflow-hidden">
          <Sidebar isOpen={isSideOpen} closeSide={() => setIsSideOpen(false)} />

          <main className="flex-1 flex flex-col p-4 bg-zinc-50 min-w-0 overflow-auto">
            <Categories />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/reset/:token" element={<ResetPassword />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/products/:id" element={<Detail />} />
              <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/admin/add-product" element={<ProductForm />} />
              <Route path="/admin/product/:id" element={<ProductForm />} />



            </Routes>

          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
