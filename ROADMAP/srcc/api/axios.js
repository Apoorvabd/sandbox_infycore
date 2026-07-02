import axios from "axios";

// Read API URL from Vite environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


console.log("🚀 Axios Initializing...");
console.log("🌍 Base URL:", BASE_URL);

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
  
        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
      
        return response.data
    },
    (error) => {
        console.error("❌ Response Error:", error);
        return Promise.reject({
            message:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            status: error.response?.status,
            errors: error.response?.data?.errors || [],
        });
    }
);

export default api;
