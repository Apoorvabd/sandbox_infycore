import axios from "axios";

// Read API URL from Vite environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("==================================");
console.log("🚀 Axios Initializing...");
console.log("🌍 Base URL:", BASE_URL);
console.log("==================================");

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
        console.group("📤 API REQUEST");
        console.log("Method :", config.method?.toUpperCase());
        console.log("BaseURL:", config.baseURL);
        console.log("URL     :", config.url);
        console.log("Full URL:", `${config.baseURL}${config.url}`);
        console.log("Params  :", config.params);
        console.log("Body    :", config.data);
        console.groupEnd();

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
        console.group("✅ API RESPONSE");
        console.log("Status :", response.status);
        console.log("URL    :", response.config.url);
        console.log("Data   :", response.data);
        console.groupEnd();

        return response.data;
    },
    (error) => {
        console.group("❌ API ERROR");

        console.log("Message :", error.message);
        console.log("Status  :", error.response?.status);
        console.log("URL     :", error.config?.url);
        console.log("Response:", error.response?.data);

        console.groupEnd();

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
