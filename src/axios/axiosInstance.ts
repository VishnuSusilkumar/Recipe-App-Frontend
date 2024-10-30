import axios from "axios";
import { refreshAccessToken } from "../utils/authUtils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshSuccess = await refreshAccessToken();
      if (refreshSuccess) {
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
