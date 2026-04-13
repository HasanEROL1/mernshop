import axios from "axios";
import axiosInstance from "./axiosInstance";


const API_URL = "http://localhost:5000/api/auth";
const config = {
  withCredentials: true,
};

// register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, config);
  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, config);
  console.log("Service response:", response.data)
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`, config)
  return response.data;
}

const getME = async () => {
  const response = await axios.get(`${API_URL}/me`, config)
  return response.data
}

// forgot password

const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgotPassword`,
    { email },
    config
  )
  return response.data
}

// reset password
const resetPassword = async (token, password) => {
  const response = await axios.post(
    `${API_URL}/resetPassword/${token}`,
    { password },
    config
  );
  return response.data;
}

const updateUser = async (userData,) => {
  const response = await axiosInstance.put(`/auth/update`, userData)
  return response.data;
}

const authService = { register, login, logout, getME, forgotPassword, resetPassword, updateUser };
export default authService;