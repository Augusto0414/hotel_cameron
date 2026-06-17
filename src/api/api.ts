import axios from "axios";
import { getENV } from "../helpers/getENV";

const { VITE_API_URL } = getENV();
const api = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});



export default api;