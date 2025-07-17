import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogit-1xz6.onrender.com/",
  withCredentials: false,
});

export default axiosInstance;
