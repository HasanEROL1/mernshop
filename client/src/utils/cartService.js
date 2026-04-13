import axiosInstance from "./axiosInstance";



const getCart = async () => {
  const response = await axiosInstance.get("/cart")
  return response.data
}

const addToCart = async (productId, qty) => {
  const response = await axiosInstance.post("/cart/add", { productId, qty })
  return response.data
}


const updateCartItem = async (productId, qty) => {
  const response = await axiosInstance.put(`/cart/update/${productId}`, { qty })
  return response.data;
};
const removeFromCart = async (productId) => {
  const response = await axiosInstance.delete(`/cart/remove/${productId}`)
  return response.data

}

const clearCart = async () => {
  const response = await axiosInstance.delete("/cart/clear")
  return (response).data
}

const cartService = { getCart, addToCart, removeFromCart, clearCart, updateCartItem }

export default cartService