import axios from "axios";

// Read API URL from Vite environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL

console.log("API Base URL:", BASE_URL);
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 13000,
    headers: {
        "Content-Type": "application/json",
    },
});


export default api;
