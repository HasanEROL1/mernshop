
import axiosInstance from "./axiosInstance";

export const getAdminProducts = async (page = 1) => {

  const response = await axiosInstance.get(`/admin/products?page=${page}`);
  return response.data;
};


export const createAdminProduct = async (productData) => {
  const response = await axiosInstance.post("/admin/product/new", productData);
  return response.data;
};

export const deleteAdminProduct = async (id) => {
  const response = await axiosInstance.delete(`/admin/product/${id}`);
  return response.data;
};

export const updateAdminProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/admin/product/${id}`, productData);
  return response.data;
};

const AdminService = { getAdminProducts, createAdminProduct, deleteAdminProduct, updateAdminProduct }

export default AdminService