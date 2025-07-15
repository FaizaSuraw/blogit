import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if using different port
  withCredentials: false,
});

export default axiosInstance;
