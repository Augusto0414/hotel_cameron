import axios from "axios";
import { getENV } from "../helpers/getENV";

const { VITE_API_URL } = getENV();
const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple global response interceptor for logging errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);
export default api;