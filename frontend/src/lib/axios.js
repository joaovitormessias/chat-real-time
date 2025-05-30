import axios from "axios";

// Permite comunicação com o backend, enviarmos cookies e requests

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api": "/api",
  withCredentials: true,
});
