import axios from "axios";

const API_URL = "http://localhost:5000/api";

// tüm ürünler
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// tek ürün

const getproductDetail = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

// filtrelenmiş ürünler
const getFilteredProducts = async (filters) => {
  const params = new URLSearchParams();

  if (filters.keyword) params.append('keyword', filters.keyword);
  if (filters.categories && filters.categories.length > 0) {
    filters.categories.forEach(cat => params.append('category', cat));
  }
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.page) params.append('page', filters.page);

  const response = await axios.get(`${API_URL}/products?${params.toString()}`);
  return response.data;
};

const productService = {
  getProducts,
  getproductDetail,
  getFilteredProducts,
};

export default productService;



